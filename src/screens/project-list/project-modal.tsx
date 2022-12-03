import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, selectProjectModalOpen } from "./project-list.slice";
import { useProjectModal } from "./util";

export const ProjectModa = ()=>{
    // const dispatch = useDispatch()
    const { projectModalOpen, close } = useProjectModal();
    // const projectModalOpen = useSelector(selectProjectModalOpen)
    return <Drawer 
        // onClose={()=>dispatch(projectListActions.closeProjectModal())} 
        onClose={close}
        visible={projectModalOpen} width={'100%'}>
        <h1>Projecct Modal</h1>
        {/* <Button onClick={()=>dispatch(projectListActions.closeProjectModal())}>关闭</Button> */}
        <Button onClick={close}>关闭</Button>
    </Drawer>
}