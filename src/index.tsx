import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadServer, DevTools} from "jira-dev-tool";
import 'antd/dist/antd.less'
import { AppProviders } from "context";
//请求管理的库
loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      {/**content存储的公共数据*/}
      <AppProviders>
        <DevTools/>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
