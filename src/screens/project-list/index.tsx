import React from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useProjectsSearchParams } from "./util";
import { Row } from "components/lid";


export const ProjectListScreen = (props:{projectButton:JSX.Element}) => {
  //标题的设置
  useDocumentTitle('项目列表',false)

  const [param,setParam] = useProjectsSearchParams()
  const debouncedParam = useDebounce(param, 200);
  //project请求列表信息
  const {isLoading,error,data:list,retry} = useProjects(debouncedParam)
  const {data:users}=useUser();
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel users={users||[]} param={param} setParam={setParam} />
      {error?<Typography.Text type="danger">{error.message}</Typography.Text>:null}
      <List 
      refresh={retry} loading={isLoading}
      users={users||[]} dataSource={list||[]}
      projectButton={props.projectButton} />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender=true

const Container = styled.div`
  padding: 3.2rem;
`