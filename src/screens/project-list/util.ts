import { useMemo } from "react"
import { useQuery } from "react-query"
import { useHttp } from "utils/http"
import { useUrlQueryParam } from "utils/url"
import { Project } from "./list"
//列表搜索参数
export const useProjectsSearchParams = () =>{
    const [param,setParam] = useUrlQueryParam(['name','personId'])
    return [
        //返回值会出现重复调用的情况所以需要加上useMemo
        //id的属性为number但是传入的属性是string进行转换
        useMemo(()=>({...param,personId:Number(param.personId)||undefined}),[param]),
        
        setParam
        //返回值是数组是联合类型，即为这两个的任意类型既可，加上as const会推断本身的类型值进行返回
    ] as const
}
export const useProjectsQueryKey  = ()=>{
    const [param] =useProjectsSearchParams();
    return ["projects",param]
}
export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
      "projectCreate",
    ]);
    const [{editingProjectId},setEditinfProjectId]=useUrlQueryParam([
      'editingProjectId'
    ])
    const {data:editingProject,isLoading}=useProject(Number(editingProjectId))
    const open = () => setProjectCreate({ projectCreate: true });
    const close = () => { projectCreate?
        setProjectCreate({projectCreate:undefined}):
        setEditinfProjectId({editingProjectId:undefined})};
    const startEdit = (id:number) => setEditinfProjectId({editingProjectId:id})
    return {
      projectModalOpen: projectCreate === "true"||Boolean(editingProject),
      open,
      close,
      startEdit,
      editingProject,
      isLoading
    };
  };
//编辑功能
export const useProject = (id?:number)=>{
    const client = useHttp()
    return useQuery<Project>(
        //名字为project检测到id的变化再次请求
        ['project',{id}],
        ()=> client(`projects/${id}`),
        {
            enabled:!!id
        }
    )
}
