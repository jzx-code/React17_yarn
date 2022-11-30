import qs from "qs";
import * as auth from 'auth-provider'
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

//请求地址放在.env和.env.development文件中
const apiUrl = process.env.REACT_APP_API_URL;
//继承RequestInit添加token
interface Config extends RequestInit{
    token?:string,
    data?:object
}
//请求的封装库
export const http = async (endpoint:string,{data,token,headers,...customConfig}:Config={}) => {
    const config = {
      method: "GET",
      headers: {
        //在Bearer后面必须加上空格不然会出错
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": data ? "application/json" : "",
      },
      //默认是GET但是用其他请求可覆盖
      ...customConfig,
    };
  
    if (config.method.toUpperCase() === "GET") {
      endpoint += `?${qs.stringify(data)}`;
    } else {
      config.body = JSON.stringify(data || {});
    }
  
    // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
    return window
      .fetch(`${apiUrl}/${endpoint}`, config)
      .then(async (response) => {
        //401请求地址有问题没有携带token数据
        if (response.status === 401) {
          await auth.logout();
          //刷新页面
          window.location.reload();
          return Promise.reject({ message: "请重新登录" });
        }
        const data = await response.json();
        if (response.ok) {
          return data;
        } else {
          return Promise.reject(data);
        }
      });
  };
//获取用户的数据并发送请求  
export const useHttp = ()=>{
    const {user} = useAuth()
    //typeof是ts的typeof可以读取静态类型这里可以读取http函数的类型Parameters可以将函数的返回类型提取出来
    return useCallback(
      (...[endpoint,config]:Parameters<typeof http>)=>
       http(endpoint,{...config,token:user?.token}),
       [user?.token]) 
}

// interface 也没法实现Utility type
// type Person = {
//     name: string;
//     age: number;
//   };
// Partial 对泛型里的类型进行编辑，这样我们给变量赋值的时候，可以不用传全部的类型，缺失某一个，或全部缺失都不会报错
//   const xiaoMing: Partial<Person> = {};
// Omit 传入两个类型，第一个是基本类型，第二个要删除的类型，也就是把第一个类型中某些属性删掉。删掉的情况下，再传这个属性就会报错，如果什么都不传也会报错，因只删除了一个属性
//   const shenMiRen: Omit<Person, "name" | "age"> = {};
//  获取对象所有属性的类型
// type PersonKeys = keyof Person;
// 取出类型返回一个新的类型
// type PersonOnlyName = Pick<Person, "name" | "age">;
// 删除这个属性返回剩下的类型
// type Age = Exclude<PersonKeys, "name">;