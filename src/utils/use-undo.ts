import {useCallback, useReducer, useState} from 'react'

const UNDO = 'UNDO'
const  REDO = 'REDO'
const SET= 'SET'
const RSEST ='RESET'
type State<T> = {
    past:T[],
    present:T,
    future:T[]
}
type Action<T> = {newPresent?:T,type:typeof UNDO|typeof REDO|typeof SET|typeof RSEST}
const undoReducer = <T>(state:State<T>,action:Action<T>)=>{
    const {past , present,future} = state
    const {newPresent} = action
    switch (action.type){
        case UNDO:{
            if(past.length===0) return state

            const previous = past[past.length-1]
            const newPast = past.slice(0,past.length-1)
            return {
                past:newPast,
                present:previous,
                future:[present,...future]
            }
        }
        case REDO:{
            if(past.length===0) return state

            const next = future[0]
            const newFuture = future.slice(1)

            return{
                past:[...past,present],
                present:next,
                future:newFuture
            }
        }
        case SET:{
            if(newPresent===present) return state
            return{
                past:[...past,present],
                present:newPresent,
                future:[]
            }
        }
        case RSEST:{
            return{
                past:[],
                present:newPresent,
                future:[]
            } 
        } 
    }
    return state
}


//用于上一步和下一步的跳转功能类似于router中的历史记录跳转
export const useUndo = <T>(initialPresent:T)=>{
    const [state,dispatch]=useReducer(undoReducer,{
        //历史
        past:[],
        present:initialPresent,
        //未来
        future:[]
    } as State<T>)
    //存在历史记录可以往回跳转
    const canUndo = state.past.length!==0
    //存在未来或是说下一步记录可以往后跳转
    const canRedo = state.future.length!==0
    const undo = useCallback(()=>{dispatch({type:UNDO})},[])
    const redo = useCallback(()=>{dispatch({type:REDO})},[])
    const set = useCallback((newPresent:T)=>{dispatch({type:SET,newPresent})},[])
    const reset = useCallback((newPresent:T)=>{dispatch({type:RSEST,newPresent})},[])
    return [
        state,
        {set,reset,undo,redo,canRedo,canUndo}
    ]as const
}