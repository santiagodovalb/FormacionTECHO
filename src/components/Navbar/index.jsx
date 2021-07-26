import React from 'react';
import './style.css'
const Navbar = () => {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              TECHO
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Mi perfil
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Mis bloques
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Mis entregas
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
}

export default Navbar;