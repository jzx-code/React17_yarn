import { useQuery } from "react-query";
import { User } from "types/user";
import { useHttp } from "./http";

//Partial将参数转换为选参数
export const useUser = (param?:Partial<User>) =>{
    //请求的封装
    const client = useHttp()
    return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
}