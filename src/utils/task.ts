import { QueryKey, useMutation, useQuery } from "react-query"
import { Project } from "types/project"
import { Task } from "types/task"
import { useHttp } from "./http"
import { SortProps } from "./kanban"
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from "./use-optimistic-options"

export const useTasks = (param?:Partial<Task>) =>{
    //请求的封装
    const client = useHttp()
    //['projects',param]一个是名字另一个是检测到param变化时再次请求
    return useQuery<Task[]>(['tasks',param],()=>client('tasks',{data:param}))
}
//添加看板
export const useAddTask = (queryKey: QueryKey) =>{
    const client = useHttp()
    return useMutation(
      (params:Partial<Task>)=>client(`tasks`,{
        method:"POST",
        data:params
      }),
      useAddConfig(queryKey)
    )
  }
export const useTask = (id?:number)=>{
    const client = useHttp()
    return useQuery<Project>(
        //名字为project检测到id的变化再次请求
        ['task',{id}],
        ()=> client(`tasks/${id}`),
        {
            enabled:!!id
        }
    )
}

//编辑用户
export const useEditTask = (queryKey:QueryKey) =>{
    const client = useHttp()
    //用于除了GET其他请求
    return useMutation(
      (params:Partial<Task>)=>client(`tasks/${params.id}`,{
        method:"PATCH",
        data:params
      }),
      useEditConfig (queryKey)
    )
  }
  export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      ({ id }: { id: number }) =>
        client(`tasks/${id}`, {
          method: "DELETE",
        }),
      useDeleteConfig(queryKey)
    );
  };
  export const useReorderTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: SortProps) => {
      return client("tasks/reorder", {
        data: params,
        method: "POST",
      });
    }, useReorderTaskConfig(queryKey));
  };