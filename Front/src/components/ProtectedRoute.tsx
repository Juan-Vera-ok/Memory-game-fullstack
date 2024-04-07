import React, { FC } from "react"
import {Navigate, Outlet, Route} from "react-router-dom"

interface Props{
    isAuth:boolean;
    component: FC
}


export const ProtectedRoute = (props:Props)=>{

    return (
        <Route element={()=>{
            return props.component()
        }}></Route>
    )
}

interface WrapperProps{
    
}
const Wrapper = ()=>{}