import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home';
import { Login } from './Login';
import SignUp from './SignUp';
import { ProtectedRoute } from './ProtectedRoute';
import { Buffer } from 'buffer';
import { ProtectedRouteLogged } from './ProtectedRouteLogged';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    authenticate().then(setIsAuth)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuth(true)} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/"
          element={
            isAuth
              ? <Home onLogout={() => setIsAuth(false)} />
              : <Navigate to={'/login'} />
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

async function authenticate(): Promise<boolean> {
  return !!document.cookie;
}
