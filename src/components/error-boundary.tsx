import React, { Component } from 'react'

type FallbackRender = (props:{error:Error|null})=>React.ReactElement
//错误边界
export default class ErrorBpundary extends Component<React.PropsWithChildren<{fallbackRender:FallbackRender}>,{error:Error|null}> {
    stata = {error:null}
    //当子组件抛出异常，这里会接收并且调用 
    static getDerivedStateFromError(error:Error){
        return {error}
    }
    render() {
      const {error}=this.stata
      const {fallbackRender,children}=this.props
      if(error){
        return fallbackRender({error})
      }
      return children
  }
}
