
import { useAuth } from "context/auth-context"
import React from "react"
import { ProjectListScreen } from "screens/project-list"
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg"
import styled from '@emotion/styled'
import {Dropdown,Menu,Button} from 'antd'
import { Row } from "components/lid"
export const AuthenticatedApp = ()=>{
    const {logout,user}=useAuth()
    return (
        <Container>
        {/* 登录页面 */}
        <Header between={true}>
            <HeaderLeft gap={true}>
                <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
                <h2>Logo</h2>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown overlay={
                    <Menu.Item key={'logout'}>
                        <Button type={"link"} onClick={logout}>登出</Button>
                    </Menu.Item>}>
                    <Button type={"link"} onClick={e => e.preventDefault()}>
                        Hi,{user?.name}
                    </Button>
                </Dropdown>

            </HeaderRight>
        </Header>
        <Main>
            {/* 信息列表组件 */}
            <ProjectListScreen/>
        </Main>
    </Container>)
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
const Main =styled.main``