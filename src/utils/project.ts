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
    const fetchProjects = ()=>client('projects',{data:cleanObject(param||{})})
    useEffect(() => {
      //可以获取当前的列表信息 
      run(fetchProjects(),{
        retry:fetchProjects
      })
      // eslint-disable-next-line
    }, [param]);
    return result
}

export const useEditProject = () =>{
  const {run,...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params:Partial<Project>)=>{
    return run(client(`projects/${params.id}`,{
      data:params,
      method:"PATCH"
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () =>{
  const {run,...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params:Partial<Project>)=>{
    return run(client(`projects/${params.id}`,{
      data:params,
      method:"POST"
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}