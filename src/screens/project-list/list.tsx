import React from "react";
import { User } from "screens/project-list/search-panel";
import { Dropdown, Menu, Table } from 'antd'
import dayjs from "dayjs";
import { TableProps } from "antd/lib/table";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lid";
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?:()=> void;
  projectButton:JSX.Element
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject()
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
  return <Table
    rowKey={"id"}
    pagination={false}
    columns={[
      {
        title: <Pin checked={true} disabled={true} />,
        render(value, project) {
          return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
        }
      },
      {
        title: "名称",
        //排序
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
          return (
            <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
          )
        }
      }, {
        title: "部门",
        dataIndex: "organization",
      },
      {
        title: "负责人",
        render(value, project) {
          //用于完成下拉选择和搜索筛选
          return <span>{users.find((user) => user.id === project.personId)?.name ||
            "未知"}</span>
        }
      },
      {
        title: "创建时间",
        render(value, project) {
          return <span>{project.created ? dayjs(project.created).format('YYY-MM-SS') : "无"
          }</span>
        }
      },{
        render(value,project){
          return <Dropdown overlay={<Menu>
            <Menu.Item key={'edit'}>
              {props.projectButton}
            </Menu.Item>
          </Menu>}>
            <ButtonNoPadding type="link">...</ButtonNoPadding>
          </Dropdown>
        }
      }
    ]}
    {...props}
  />
};
