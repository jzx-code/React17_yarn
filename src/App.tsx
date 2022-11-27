import { AuthenticatedApp } from "authenticated-app";
import ErrorBpundary from "components/error-boundary";
import { FullPageErrorFallback } from "components/lid";
import { useAuth } from "context/auth-context";
import React from "react";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./App.css";

function App() {
  //获取content中的用户数据
  const {user} = useAuth()
  return (
    <div className="App">
      {/* 错误页面 */}
      <ErrorBpundary fallbackRender={FullPageErrorFallback}>
        {/* 根据用户信息加载页面 */}
        {user?<AuthenticatedApp/>:<UnauthenticatedApp/>}
      </ErrorBpundary>

    </div>
  );
}

export default App;
