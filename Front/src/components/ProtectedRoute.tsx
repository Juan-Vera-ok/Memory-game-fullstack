import React, { FC, ReactNode } from "react"
import {Navigate, Outlet, Route} from "react-router-dom"

interface Props{
    isAuth:boolean;
    component: React.ReactElement
}

export const ProtectedRoute = (props:Props)=>{
    const element = props.isAuth ? props.component : null;
    return (<Route element={element} />); 
}
