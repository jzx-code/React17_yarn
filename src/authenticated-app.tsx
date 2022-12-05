
import { useAuth } from "context/auth-context"
import React, { useState } from "react"
import { ProjectListScreen } from "screens/project-list"
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg"
import styled from '@emotion/styled'
import { Dropdown, Menu, Button } from 'antd'
import { ButtonNoPadding, Row } from "components/lid"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { ProjectScreen } from "screens/peoject"
import { resetRoute } from "utils"
import { ProjectModa } from "screens/project-list/project-modal"
import { ProjectPopover } from "components/project-popover"
export const AuthenticatedApp = () => {
    return (
        <Container>
            <BrowserRouter>
                {/* 登录页面 */}
                <PageHeader />
                <Main>
                    {/* 信息列表组件 */}
                    {/* <ProjectListScreen /> */}
                    <Routes>
                        <Route path={"projects"} element={<ProjectListScreen />} />
                        <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
                        <Route index element={<ProjectListScreen />} />
                    </Routes>
                </Main>
                <ProjectModa />
            </BrowserRouter>
        </Container>)
}
const PageHeader = () => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type="link" onClick={resetRoute}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                </ButtonNoPadding>
                <ProjectPopover />
                <span>用户</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}
const User = () => {
    const { logout, user } = useAuth()
    return <Dropdown key={'user'}
        overlay={
            <Menu>
                <Menu.Item key={"logout"}>
                    <Button onClick={logout} type={"link"}>
                        登出
                    </Button>
                </Menu.Item>
            </Menu>
        }
    >
        <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
        </Button>
    </Dropdown>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    z-index: 1;
`;
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main``