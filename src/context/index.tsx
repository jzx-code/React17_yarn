import React,{ReactNode} from "react"
import { AuthProvider } from "./auth-context"
export const AppProviders = ({children}:{children:ReactNode})=>{
    //插槽
    return <AuthProvider>
        {children}
    </AuthProvider>
}