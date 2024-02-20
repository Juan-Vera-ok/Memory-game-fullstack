import React,{useState,useEffect} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import {Login} from './Login';
import SignUp from './SignUp';
import { ProtectedRoute } from './ProtectedRoute';
import { Buffer } from 'buffer';
import { ProtectedRouteLogged } from './ProtectedRouteLogged';

global.Buffer = Buffer;


    export default function App(){
      let isAuth=false
      if(window.localStorage.getItem("token")){
        isAuth=true
      }
        const [userAuth,setUserAuth]=useState(isAuth)

        useEffect(()=>{
          window.addEventListener('storage',()=>{
            setUserAuth(false)
          })
        })
        

            return(
              
                <BrowserRouter>
                  
                            <Routes>
                                    <Route element={<ProtectedRouteLogged userAuth={userAuth}/>}>
                                    <Route path="/login" element={<Login userAuth={userAuth} setUserAuth={setUserAuth} />} />
                                    <Route path="/sign-up" element={<SignUp/>}></Route>
                                    </Route>
                            
                                        <Route element={<ProtectedRoute userAuth={userAuth}/>}>
                                                <Route path="/" element={<Home userAuth={userAuth} setUserAuth={setUserAuth} />} />
                                        </Route>    
                                    
                                    
                            </Routes>
                    </BrowserRouter>)
        }
        
        
        
    
    

