import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import {Form,Input,Button} from 'antd'
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";
//请求地址放在.env和.env.development文件中
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({onError}:{onError:(error:Error)=>void}) => {
  const {login,user}=useAuth()
  //需要catch捕获异常故传入throwOnError:true
  const {run,isLoading}=useAsync( undefined,{throwOnError:true})
  const handleSubmit = async (values: {username:string,password:string}) => {
    try{
       await run(login(values))
    }catch(e){
      //将捕获到的错误信息传到父组件
      onError(e as Error)
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      
      <Form.Item name={'username'} rules={[{required:true,message:"请输入用户名"}]}>
        <Input placeholder={"用户名"}  type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{required:true,message:"请输入密码"}]}>
        <Input placeholder={"密码"}  type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>登录</LongButton>
      </Form.Item>  
    </Form>
  );
};
