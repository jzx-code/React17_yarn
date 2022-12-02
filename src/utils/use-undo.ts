import {useCallback, useState} from 'react'
//用于上一步和下一步的跳转功能类似于router中的历史记录跳转
export const useUndo = <T>(initialPresent:T)=>{
    const [state,setState] = useState<{
        past:T[],
        present:T,
        future:T[]
    }>({
        //历史
        past:[],
        present:initialPresent,
        //未来
        future:[]
    })
    //存在历史记录可以往回跳转
    const canUndo = state.past.length!==0
    //存在未来或是说下一步记录可以往后跳转
    const canRedo = state.future.length!==0
    const undo = useCallback(()=>{
        setState(currentState =>{
            const {past , present,future} = currentState
            if(past.length===0) return currentState
            //获取现在的值并且返回一个不包含上一个值的内容
            const previous = past[past.length-1]
            const newPast = past.slice(0,past.length-1)
            return {
                past:newPast,
                present:previous,
                future:[present,...future]
            }
        })
    },[])
    const redo = useCallback(()=>{
        setState(currentState =>{
            const {past , present,future} = currentState
            if(past.length===0) return currentState

            const next = future[0]
            const newFuture = future.slice(1)

            return{
                past:[...past,present],
                present:next,
                future:newFuture
            }
        })
    },[])
    const set = useCallback((newPresent:T)=>{
        setState(currentState =>{
            const {past , present,future} = currentState
            if(newPresent===present) return currentState
            return{
                past:[...past,present],
                present:newPresent,
                future:[]
            }
        })
    },[])
    const reset = useCallback((newPresent:T)=>{
        setState(() =>{
            return{
                past:[],
                present:newPresent,
                future:[]
            }
        })
    },[])
    return [
        state,
        {set,reset,undo,redo,canRedo,canUndo}
    ]as const
}