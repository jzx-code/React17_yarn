import { useAuth } from "context/auth-context";
import React from "react";
import {Form,Input} from 'antd'
import { LongButton } from "unauthenticated-app";
// interface Base {
//   id: number
// }
//
// interface Advance extends Base {
//   name: string
// }
//
// const test = (p: Base) => {
// }
//
// // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// const a = {id: 1, name: 'jack'}
// test(a)
// //请求地址放在.env和.env.development文件中
// const apiUrl = process.env.REACT_APP_API_URL;
// 获取用户输入的信息
export const RegisterScreen = () => {
  const {register}=useAuth()

  // HTMLFormElement extends Element
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };
  const handleSubmit = (values: {username:string,password:string}) => {
    register(values);
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
        <LongButton htmlType={"submit"} type={"primary"}>注册</LongButton>
      </Form.Item>  
    </Form>
  );
};
