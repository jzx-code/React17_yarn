import React from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row, ScreenContainer } from "components/lib";



export const ProjectListScreen = () => {
  //标题的设置
  useDocumentTitle('项目列表',false)

  const [param,setParam] = useProjectsSearchParams()
  const debouncedParam = useDebounce(param, 200);
  //project请求列表信息
  const {isLoading,error,data:list} = useProjects(debouncedParam)
  const {data:users}=useUser();
  // const dispatch = useDispatch()
  const { open } = useProjectModal();
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding 
            //onClick={()=>dispatch(projectListActions.openProjectModal())} 
            onClick={open}
            type={"link"}>创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users||[]} param={param} setParam={setParam} />
      <ErrorBox error={error}/>
      <List 
       loading={isLoading}
      users={users||[]} dataSource={list||[]}/>
    </ScreenContainer>
  );
};

// ProjectListScreen.whyDidYouRender=true

const Container = styled.div`
  padding: 3.2rem;
`