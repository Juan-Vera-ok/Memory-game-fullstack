import React from "react"
import {Navigate, Outlet} from "react-router-dom"

export const ProtectedRoute = (props)=>{
    if(props.userAuth===false){
        
        return <Navigate to="/login"/>
    }
    return <Outlet/>
}