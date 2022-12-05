import { useEffect } from "react";
import { User } from "types/user";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
//Partial将参数转换为选参数
export const useUser = (param?:Partial<User>) =>{
    //异步函数
    const {run,...result} = useAsync<User[]>()
    //请求的封装
    const client = useHttp()
    useEffect(() => {
      //可以获取当前的一个登陆状态  
      run(client('users',{data:cleanObject(param||{})}))
    }, [param,run,client]);
    return result
}