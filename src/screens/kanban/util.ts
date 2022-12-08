import { useMemo } from "react";
import { useLocation } from "react-router"
import { useProject } from "screens/project-list/util";
import { useUrlQueryParam } from "utils/url";

export const useProjectIdInUrl = ()=>{
    const {pathname} = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl  = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParamas = () => ({projectId:useProjectIdInUrl()})

export const useKanbansQuerytKey = () =>
    ['kanbans' ,useKanbanSearchParamas()];

export const useTasksSearchParamas = () => {
    const [param,setParam] = useUrlQueryParam([
        "name",
        "typeId",
        "processorId",
        "tagId"
    ])
    const projectId = useProjectIdInUrl()
    return useMemo(()=>({
        projectId,
        typeId:Number(param.typeId)||undefined,
        processorId:Number(param.processorId)||undefined,
        tagId:Number(param.tagId)||undefined,
        name:param.name
    }),[projectId,param])
}


export const useTasksQuerytKey = () =>
    ['tasks' ,useTasksSearchParamas()];