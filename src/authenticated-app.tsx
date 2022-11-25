import { useAuth } from "context/auth-context"
import React from "react"
import { ProjectListScreen } from "screens/project-list"
export const AuthenticatedApp = ()=>{
    const {logout}=useAuth()
    return <div>
        {/* 登录页面 */}
        <button onClick={logout}>登出</button>
        {/* 信息列表组件 */}
        <ProjectListScreen/>
    </div>
}