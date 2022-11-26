import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?:Partial<Project>) =>{
    //异步函数
    const {run,...result} = useAsync<Project[]>()
    //请求的封装
    const client = useHttp()
    useEffect(() => {
      //可以获取当前的一个登陆状态  
      run(client('projects',{data:cleanObject(param||{})}))
      // eslint-disable-next-line
    }, [param]);
    return result
}