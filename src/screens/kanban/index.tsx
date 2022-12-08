import styled from "@emotion/styled";
import React from "react";
import { SearchPanel } from "./search-panel";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParamas, useProjectInUrl } from "./util";
import { ScreenContainer } from "components/lib";

export const KanbanScreen = () => {
    useDocumentTitle("看板列表")
    const { data: currentProject } = useProjectInUrl()
    const { data: kanbans } = useKanbans(useKanbanSearchParamas())
    console.log(kanbans)
    return (
        <ScreenContainer>
            <h1>{currentProject?.name}</h1>
            <SearchPanel />
            <ColumnsContainer>
                {kanbans?.map((kanban) => (
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                ))}
            </ColumnsContainer>
        </ScreenContainer>
    )
}
const ColumnsContainer = styled.div`
  display: flex;
  /* overflow-y: scroll; */
  flex: 1;
`;