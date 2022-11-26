import { useState } from "react";
//状态信息
interface State<D>{
    error:Error|null;
    data:D|null;
    stat:'idle'|'loading'|'error'|'success'
}
//初始化
const defaultInitialState:State<null>={
    stat:"idle",
    data:null,
    error:null
}

const defaultConfig = {
    throwOnError:false
}
export const useAsync=<D>(initialState?:State<D>,initialConfig?:typeof defaultConfig)=>{
    const config = {...defaultConfig,...initialConfig}
    const [state,setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    //成功
    const setData = (data:D)=> setState({
        data,
        stat:"success",
        error:null
    })
    //失败
    const setError = (error:Error)=>setState({
        error,
        stat:"error",
        data:null
    })
    //出发异步请求
    const run = (promise:Promise<D>)=>{
        if(!promise||!promise.then){
            throw new Error('请传入Promise 类型数据')
        }
        setState({...state,stat:"loading"})
        return promise.then(data =>{
            setData(data)
            return data
        }).catch(error=>{
            setError(error)
            console.log(config.throwOnError)
            if(config.throwOnError) 
                //这里的catch会拦截异常如果需要在外面接收异常就需要重新的抛出
                return Promise.reject(error)
            return error 
           
            
        })
    }
    //返回当前状态以及异步函数
    return {
        isIdle:state.stat==='idle',
        isLoading:state.stat==='loading',
        isError:state.stat==='error',
        isSuccess:state.stat==='success',
        run,
        setData,
        setError,
        ...state
    }
}