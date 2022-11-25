
import { useAuth } from "context/auth-context"
import React from "react"
import { ProjectListScreen } from "screens/project-list"
import styled from '@emotion/styled'
import { Row } from "components/lid"
export const AuthenticatedApp = ()=>{
    const {logout}=useAuth()
    return (
        <Container>
        {/* 登录页面 */}
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>Logo</h2>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>登出</button>
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

`;
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main =styled.main``