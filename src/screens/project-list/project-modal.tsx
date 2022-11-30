import { Button, Drawer } from "antd";
import React from "react";

export const ProjectModa = (props:{projectModalOpne:boolean,onClose:()=>void})=>{
    return <Drawer onClose={props.onClose} visible={props.projectModalOpne} width={'100%'}>
        <h1>Projecct Modal</h1>
        <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
}