import React from "react"
import {Navigate, Outlet} from "react-router-dom"

export const ProtectedRouteLogged = (props)=>{
    if(props.userAuth===true){
        
        return <Navigate to="/"/>
    }
    return <Outlet/>
}