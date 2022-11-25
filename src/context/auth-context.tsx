import React, { ReactNode, useState } from "react";
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm{
    username:string,
    password:string
}
//登录保持
//获取用户的账号信息
const bootstrapUser = async()=>{
    let user = null;
    //获取用户之前保存的token信息
    const token = auth.getToken()
    if(token){
        //将这token信息发送到me的API中获取用户信息
        const data = await http('me',{token})
        user = data.user
    }
    return user
} 
//新建context数据
const AuthContext = React.createContext<{
    user:User|null,
    register:(form:AuthForm)=>Promise<void>,
    login:(form:AuthForm)=>Promise<void>,
    logout:()=>Promise<void>,
}|undefined>(undefined)

//正常无需配置这个特定devtools的需要配置
AuthContext.displayName='AuthContext'

export const AuthProvider = ({children}:{children:ReactNode})=>{
    const [user,setUser] = useState<User|null>(null)
    const login = (form:AuthForm) =>auth.login(form).then(user=>setUser(user))
    const register = (form:AuthForm) =>auth.register(form).then(user=>setUser(user))
    const logout = () => auth.logout().then(()=>setUser(null))
    //页面加载调用
    useMount(()=>{
        //获取用户信息并改变用户信息在APP.tsx中是根据这个信息加载页面的
        bootstrapUser().then(setUser)
    })
    //共享数据
    return <AuthContext.Provider children={children} value={{user,login,register,logout}}/>
}
 //调用context请求
export const useAuth = () =>{
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}