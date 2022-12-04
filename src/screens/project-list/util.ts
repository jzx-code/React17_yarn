import { useMemo } from "react"
import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import { useHttp } from "utils/http"
import { useUrlQueryParam } from "utils/url"
import { Project } from "./list"

export const useProjectsSearchParams = () =>{
    const [param,setParam] = useUrlQueryParam(['name','personId'])
    //节流防抖查看用户的选项和输入框的信息
    
    return [
        //返回值会出现重复调用的情况所以需要加上useMemo
        //id的属性为number但是传入的属性是string进行转换
        useMemo(()=>({...param,personId:Number(param.personId)||undefined}),[param]),
        
        setParam
        //返回值是数组是联合类型，即为这两个的任意类型既可，加上as const会推断本身的类型值进行返回
    ] as const
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
      "projectCreate",
    ]);
    const [{editingProjectId},setEditinfProjectId]=useUrlQueryParam([
        'editingProjectId'
    ])
    // const [_, setUrlParams] = useSearchParams();
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
        ['project',{id}],
        ()=> client(`projects/${id}`),
        {
            enabled:!!id
        }
    )
}
