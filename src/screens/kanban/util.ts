import { useLocation } from "react-router"
import { useProject } from "screens/project-list/util";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";

export const useProjectIdInUrl = ()=>{
    const {pathname} = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInUrl  = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParamas = () => ({projectId:useProjectIdInUrl()})

export const useKanbansQuerytKey = () =>
    ['kanbans' ,useKanbanSearchParamas()];

export const useTasksSearchParamas = () => ({projectId:useProjectIdInUrl()})

export const useTasksQuerytKey = () =>
    ['tasks' ,useTasksSearchParamas()];