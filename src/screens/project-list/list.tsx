import React from "react";
import { User } from "screens/project-list/search-panel";
import {Table} from 'antd'
import dayjs from "dayjs";
import { TableProps } from "antd/lib/table";
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created:number;
}

interface ListProps  extends TableProps<Project>{
  users: User[];
}

export const List = ({ users , ...props}: ListProps) => {
  return <Table  rowKey={"id"} pagination={false} columns={[{
    title:"名称",
    dataIndex:"name",
    //排序
    sorter:(a,b)=>a.name.localeCompare(b.name)
  },{
    title:"部门",
    dataIndex:"organization",
  },
  {
    title:"负责人",
    render(value,project){
      //用于完成下拉选择和搜索筛选
      return <span>{users.find((user) => user.id === project.personId)?.name ||
        "未知"}</span>
    }
  },
  {
    title:"创建时间",
    render(value,project){
      return <span>{project.created?dayjs(project.created).format('YYY-MM-SS'):"无"
        }</span>
    }
  }
  ]} 
  {...props}
  />
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           {/*undefined.name*/}
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "未知"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
