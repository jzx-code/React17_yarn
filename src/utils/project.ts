import { useCallback, useEffect } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "types/project";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";
//Partial将参数转换为选参数
export const useProjects = (param?:Partial<Project>) =>{
    //请求的封装
    const client = useHttp()
    //['projects',param]一个是名字另一个是检测到param变化时再次请求
    return useQuery<Project[]>(['projects',param],()=>client('projects',{data:param}))
}
//编辑用户
export const useEditProject = (queryKey:QueryKey) =>{
  const client = useHttp()
  const queryClient = useQueryClient()
  //用于除了GET其他请求
  return useMutation(
    (params:Partial<Project>)=>client(`projects/${params.id}`,{
      method:"PATCH",
      data:params
    }),
    useEditConfig (queryKey)
  )
}
//添加用户
export const useAddProject = (queryKey: QueryKey) =>{
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params:Partial<Project>)=>client(`projects`,{
      method:"POST",
      data:params
    }),
    useAddConfig(queryKey)
  )
}
export const useDeleteProject = (queryKey:QueryKey)=>{
  const client = useHttp();
  return useMutation(
    ({id}:{id:Number})=>
      client(`projects/${id}`,{
        method:"DELETE"
      }),
    useDeleteConfig(queryKey)
  )
}