import { useCallback, useState } from "react";
import { useMountedRef } from "utils";
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
//判断加载中的状态
export const useAsync=<D>(initialState?:State<D>,initialConfig?:typeof defaultConfig)=>{
    //根据接收的信息进行是否需要异步的错误信息
    //查看掉函数的时候是否需要catch
    const config = {...defaultConfig,...initialConfig}
    const [state,setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const mountedRef = useMountedRef()
    //使用useState保存函数的时候只加上一层会导致页面挂载和页面更新的时候直接调用
    //是因为useState保存函数消耗性能所以进行了懒加载，如果需要保存函数
    //就在这个函数为在套上一层
    const [retry,setRetry] = useState(()=>()=>{
    })
    //成功
    const setData =useCallback( 
     (data:D)=> 
        setState({
            data,
            stat:"success",
            error:null
        }),
     []
     )
    //失败
    const setError = useCallback( (error:Error)=>setState({
        error,
        stat:"error",
        data:null
    }),[])
    //出发异步请求
    const run = useCallback(
        (promise:Promise<D>,runConfig?:{retry:()=>Promise<D>})=>{
        if(!promise||!promise.then){
            throw new Error('请传入Promise 类型数据')
        }
        setRetry(()=>()=>{
            if(runConfig?.retry){
                run(runConfig?.retry(),runConfig)
            }
            
        })
        //由于uesCallbak依赖于state选项state值改变就会重新调用会陷入无线循环
        //故使用state
        setState(prevState=> ({...prevState,stat:"loading"}))
        return promise
            .then(data =>{
            if(mountedRef.current){
                setData(data)
            }
            return data
        }).catch(error=>{
            setError(error)
            console.log(config.throwOnError)
            if(config.throwOnError) 
                //这里的catch会拦截异常如果需要在外面接收异常就需要重新的抛出
                return Promise.reject(error)
            return error 
        })
    },[config.throwOnError,mountedRef,setData,setError])
    //返回当前状态以及异步函数
    return {
        isIdle:state.stat==='idle',
        isLoading:state.stat==='loading',
        isError:state.stat==='error',
        isSuccess:state.stat==='success',
        run,
        setData,
        setError,
        //调用后执行run,让数据进行刷新
        retry,
        ...state
    }
}