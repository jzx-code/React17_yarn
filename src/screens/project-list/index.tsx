import React from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";


export const ProjectListScreen = () => {
  //标题的设置
  useDocumentTitle('项目列表',false)

  const [param,setParam] = useProjectsSearchParams()
  const debouncedParam = useDebounce(param, 200);
  //project请求
  const {isLoading,error,data:list} = useProjects(debouncedParam)
  const {data:users}=useUser();
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users||[]} param={param} setParam={setParam} />
      {error?<Typography.Text type="danger">{error.message}</Typography.Text>:null}
      <List loading={isLoading} users={users||[]} dataSource={list||[]} />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender=true

const Container = styled.div`
  padding: 3.2rem;
`