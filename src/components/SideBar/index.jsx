import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'


const Sidebar = () => {

    return (
        <>
            <div className="sidebar d-flex flex-column flex-shrink-0 p-3" style={{ width: '280px' }}>
                <img src="https://static.wixstatic.com/media/602b79_9aea50902ee84caeafdbaf5b85ddfd19~mv2.png/v1/fill/w_420,h_140,al_c,q_95/Logo%20PNG%20en%20negativo.webp" alt="logo-techo" />
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="?" className="nav-link link-light">
                            Mi perfil
                        </a>
                    </li>
                    <li>
                        <a href="?" className="nav-link link-light">
                            Mis bloques
                        </a>
                    </li>
                    <li>
                        <a href="?" className="nav-link link-light">
                            Mis entregas
                        </a>
                    </li>
                </ul>
                <hr />
                <p>Cerrar sesion</p>
            </div>
        </>
    );
};

export default Sidebar;
