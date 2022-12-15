import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/Kanban"
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp();

    return useQuery<Kanban[]>(["kanbans", param], () =>
        client("kanbans", { data: param })
    );
};
//添加看板
export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Kanban>) => client(`kanbans`, {
            method: "POST",
            data: params
        }),
        useAddConfig(queryKey)
    )
}
export const useDeleteKanban = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        ({ id }: { id: number }) =>
            client(`kanbans/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};
export interface SortProps {
    // 要重新排序的 item
    fromId: number;
    // 目标 item
    referenceId: number;
    // 放在目标item的前还是后
    type: "before" | "after";
    fromKanbanId?: number;
    toKanbanId?: number;
  }
  
  export const useReorderKanban = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: SortProps) => {
      return client("kanbans/reorder", {
        data: params,
        method: "POST",
      });
    }, useReorderKanbanConfig(queryKey));
  };