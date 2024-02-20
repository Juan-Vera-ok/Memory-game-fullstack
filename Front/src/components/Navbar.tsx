import React from "react";
import {Link,Navigate,useNavigate} from 'react-router-dom'


export default function Navbar(props){
  
  const navigate = useNavigate();

const logOut = ()=>{
  window.localStorage.removeItem("token")
  props.setUserAuth(false)
}



    return (
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse collapse" id="navbarColor02" style={{}}>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">s</a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">Separated link</a>
                </div>
              </li>
            </ul>
            <div >
             <li className="d-flex nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Usuario</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Mi perfil</a>
                  <a className="dropdown-item" href="#">Configuración</a>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item" onClick={logOut}>Cerrar sesión</button>
                </div>
              </li>
          </div>
          </div>
          
          
        </div>
      </nav>
)}