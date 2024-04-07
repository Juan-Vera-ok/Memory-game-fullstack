import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home';
import { Login } from './Login';
import SignUp from './SignUp';
import { ProtectedRoute } from './ProtectedRoute';
import { Buffer } from 'buffer';
import { ProtectedRouteLogged } from './ProtectedRouteLogged';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function App() {


  const [isAuth, setIsAuth] = useState<boolean>();
  useEffect(() => {
    authenticate().then(setIsAuth)
  }, [])
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>

        <ProtectedRoute isAuth={isAuth} component={<Home></Home>}>
        </ProtectedRoute>



      </Routes>
      <ToastContainer />
    </BrowserRouter>)
}



async function authenticate(): Promise<boolean> {
  return !!document.cookie;
}


