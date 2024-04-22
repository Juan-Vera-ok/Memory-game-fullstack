import React from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'

interface Props {
  onLogout: () => void;
}

export default function Navbar(props: Props) {

  const navigate = useNavigate();

  const logOut = () => {
    document.cookie = "";
    props.onLogout();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark retro">
      <div className="container">
        <a className="navbar-brand" href="#">Memory game!</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse collapse" id="navbarColor02" style={{}}>
          <ul className="navbar-nav me-auto">
          </ul>
          <div >
            <li className="d-flex nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Menu</a>
              <div className="dropdown-menu">
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={logOut}>Cerrar sesión</button>
              </div>
            </li>
          </div>
        </div>


      </div>
    </nav>
  )
}