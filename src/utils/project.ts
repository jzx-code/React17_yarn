import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
//Partial将参数转换为选参数
export const useProjects = (param?:Partial<Project>) =>{
    //请求的封装
    const client = useHttp()
    return useQuery<Project[]>(['projects',param],()=>client('projects',{data:param}))
}
//编辑用户
export const useEditProject = () =>{
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params:Partial<Project>)=>client(`projects/${params.id}`,{
      method:"PATCH",
      data:params
    }),{
      //自动刷新
      onSuccess:()=> queryClient.invalidateQueries('projects')
    }
  )
}
//添加用户
export const useAddProject = () =>{
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params:Partial<Project>)=>client(`projects`,{
      method:"POST",
      data:params
    }),{
      //自动刷新
      onSuccess:()=> queryClient.invalidateQueries('projects')
    }
  )
}