import styled from "@emotion/styled"
import { Spin, Typography } from "antd"
import { Button } from "antd/lib/radio"
import { DevTools } from "jira-dev-tool"
import React from "react"
export const Row =styled.div<{
    gap?:number | boolean,
    between?:boolean,
    marginBotton?:number
    }>`
    display: flex;
    align-items: center;
    justify-content: ${props=>props.between?"space-between":undefined};
    margin-bottom:${props=>props.marginBotton+"rem"} ;
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
    <Typography.Text type="danger">{error?.message}</Typography.Text>
</FullPage>

export const ButtonNoPadding = styled(Button)`
    padding: 0;
    border: 0px;
    :first-of-type{
        border-left: 0px;
    }
`