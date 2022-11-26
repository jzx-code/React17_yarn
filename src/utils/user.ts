import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUser = (param?:Partial<User>) =>{
    //异步函数
    const {run,...result} = useAsync<User[]>()
    //请求的封装
    const client = useHttp()
    useEffect(() => {
      //可以获取当前的一个登陆状态  
      run(client('users',{data:cleanObject(param||{})}))
      // eslint-disable-next-line
    }, [param]);
    return result
}