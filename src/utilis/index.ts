import { useEffect, useState } from "react"
//出现0的情况时转为true不是就为value
export const isFalsy = (value:unknown)=>(value===0?false:!value)
export const cleanObject = (object:object):any =>{
    const result = {...object}
    Object.keys(result).forEach(key=>{
        //获取value的值
        //@ts-ignore
        const value = result[key]
        if(isFalsy(value)){
            //@ts-ignore
            delete result[key]
        }
    })
    return result
}
export const useMount=(callback:()=>void)=>{
    useEffect(()=>{
        callback()
    },[])
}
export const  useDebounce = <T> (value:T,delay?:number)=>{
    const [debounceValue,setDebouncedValue]=useState(value)
    useEffect(()=>{
        const tiemout = setTimeout(()=>setDebouncedValue(value),delay)
        return ()=> clearTimeout(tiemout)
    },[value,delay])
    return debounceValue 
    // let tiemout;
    // return (...param)=>{
    //     if(tiemout){
    //         clearTimeout(tiemout)
    //     }
    //     tiemout=setTimeout(function(){
    //         func(...param);
    //     },delay);
    // }
}
export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);
    return {
      value,
      setValue,
      add: (item: T) => setValue([...value, item]),
      clear: () => setValue([]),
      removeIndex: (index: number) => {
        const copy = [...value];
        copy.splice(index, 1);
        setValue(copy);
      },
    };
  };