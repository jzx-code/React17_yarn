import Item from "antd/lib/list/Item";
import { QueryKey, useQueryClient } from "react-query";
import { Task } from "types/task";
import { reorder } from "./reorder";
//乐观更新
export const useConfig = (
    queryKey:QueryKey,
    callback:(target:any,old?:any[])=>any[]
)=>{
    const queryClient = useQueryClient()
    return {
        onSuccess:()=> queryClient.invalidateQueries(queryKey),
        async onMutate(target:any){
            const preiousItems = queryClient.getQueriesData(queryKey)
            queryClient.setQueryData(queryKey,(old?:any[])=>{
                return callback(target,old)
            })
            return {preiousItems}
        },
        onError(error :any,newItem:any,context:any){
            queryClient.setQueriesData(queryKey,context.preiousItems)
        }
    }
}
//删除
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
//编辑
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
//添加
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

  export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });