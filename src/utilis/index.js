import { useEffect, useState } from "react"

//出现0的情况时转为true不是就为value
export const isFalsy = value=>value===0?false:!value
export const cleanObject = (object) =>{
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