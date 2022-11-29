import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
//Partial将参数转换为选参数
export const useProjects = (param?:Partial<Project>) =>{
    //异步函数
    const {run,...result} = useAsync<Project[]>()
    //请求的封装
    const client = useHttp()
    useEffect(() => {
      //可以获取当前的列表信息 
      run(client('projects',{data:cleanObject(param||{})}))
      // eslint-disable-next-line
    }, [param]);
    return result
}