// import {jsx} from '@emotion/react'
import React from "react";
import { Form, Input, Select } from 'antd'
import { Project } from "../../types/project";
import { UserSelect } from "components/user-select";
import { User } from "../../types/user";
interface SearchPanelProps {
  users: User[];
  //Partial将参数转换为选参数
  param:Partial<Pick<Project,'name'|'personId'>>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{marginBottom:'2rem'}} layout="inline">
      <Form.Item>
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={evt =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={value =>
            setParam({
              ...param,
              personId: value,
            })}/>
        {/* <Select
          value={param.personId}
          onChange={value =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
      </Form.Item>
    </Form>
  );
};
