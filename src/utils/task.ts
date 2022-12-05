import { useQuery } from "react-query"
import { Task } from "types/task"
import { useHttp } from "./http"

export const useTasks = (param?:Partial<Task>) =>{
    //请求的封装
    const client = useHttp()
    //['projects',param]一个是名字另一个是检测到param变化时再次请求
    return useQuery<Task[]>(['tasks',param],()=>client('kanbans',{data:param}))
}