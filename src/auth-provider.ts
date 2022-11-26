import {User} from "screens/project-list/search-panel"
//请求地址放在.env和.env.development文件中
const apiUrl = process.env.REACT_APP_API_URL;
//token令牌
const localStorageKey = '__auth_provider_token__'
//查看是否存在这个token
export const getToken =()=>window.localStorage.getItem(localStorageKey)
//用户信息绑定token
export const handleUserResponse = ({user}:{user:User})=>{
    window.localStorage.setItem(localStorageKey,user.token||"")
    return user
}
//登录
export const login = (data:{username:string,password:string})=>{
    return fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        }else{
            //由于fetch访问错误的时候无法抛出异常只能用else抛出一个异步的异常
            return Promise.reject(await response.json())
        }
      });
}
//注册
export const register = (data:{username:string,password:string})=>{
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(await response.json())
        }
      });
}
//清除token退出登录
export const logout = async ()=>window.localStorage.removeItem(localStorageKey)