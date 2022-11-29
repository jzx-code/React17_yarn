import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

export const useProjectsSearchParams = () =>{
    const [param,setParam] = useUrlQueryParam(['name','personId'])
    //节流防抖查看用户的选项和输入框的信息
    
    return [
        //返回值会出现重复调用的情况所以需要加上useMemo
        //id的属性为number但是传入的属性是string进行转换
        useMemo(()=>({...param,personId:Number(param.personId)||undefined}),[param]),
        
        setParam
        //返回值是数组是联合类型，即为这两个的任意类型既可，加上as const会推断本身的类型值进行返回
    ] as const
}