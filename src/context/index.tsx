import React,{ReactNode} from "react"
import { AuthProvider } from "./auth-context"
import {QueryClient,QueryClientProvider} from 'react-query'
import { store } from "store";
import { Provider } from "react-redux";
export const AppProviders = ({children}:{children:ReactNode})=>{
    //插槽
    return (
      <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <AuthProvider>
            {children}
          </AuthProvider>  
        </QueryClientProvider>
      </Provider>
    );
}