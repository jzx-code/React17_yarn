import styled from "@emotion/styled"
import { Spin, Typography,Button } from "antd"
import { DevTools } from "jira-dev-tool"
import React from "react"
export const Row =styled.div<{
    gap?:number | boolean,
    between?:boolean,
    marginBottom?:number
    }>`
    display: flex;
    align-items: center;
    justify-content: ${props=>props.between?"space-between":undefined};
    margin-bottom:${props=>props.marginBottom+"rem"} ;
    >*{
        margin-top: 0!important;
        margin-bottom: 0!important;
        margin-right: ${props=>typeof props.gap === 'number'?props.gap+'rem' :props.gap?"2rem":undefined};
    }
`
const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
//加载组件
export const FullPageLoading=()=><FullPage>
    <Spin size={"large"}/>
</FullPage>
//错误组件
export const FullPageErrorFallback = ({error}:{error:Error|null})=><FullPage>
    {/* 小齿轮 */}
    <DevTools/>
    <ErrorBox error={error}/>
</FullPage>

export const ButtonNoPadding = styled(Button)`
    padding: 0;
    background: white;
    /* border: 0px; */
    :first-of-type{
        content: none;
        border: 0px;
    }
    :not(:first-of-type)::before{
     width: 1px;
     border: 1px solid white;
     background: white;
    }

`
//类型守卫
const isError = (value:any) :value is Error => value?.massage

export const ErrorBox = ({error}:{error:unknown})=>{
    if(isError(error)){
        return <Typography.Text type="danger">{error?.message}</Typography.Text>
    }
    return null
}