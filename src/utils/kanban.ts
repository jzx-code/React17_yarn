import { useQuery } from "react-query"
import { Kanban } from "types/Kanban"
import { useHttp } from "./http"

export const useKanbans = (param?:Partial<Kanban>) =>{
    //请求的封装
    const client = useHttp()
    //['projects',param]一个是名字另一个是检测到param变化时再次请求
    return useQuery<Kanban[]>(['tasks',param],()=>client('tasks',{data:param}))
}