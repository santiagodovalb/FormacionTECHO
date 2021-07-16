import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Links () {

    const user = useSelector(state => state.user)

    return (
        <div>
        
        {!user.rolId && ''}

        {user.rolId === 1 &&

        <div>
        <Link to={`/user/${user.id}/admin-bloques`}>
        <h6 className="nav-link link-light">
            Gestionar Bloques
        </h6>
        </Link>

        <Link to={`/user/${user.id}/admin-usuarios`}>
        <h6 className="nav-link link-light">
            Gestionar Usuarios
        </h6>
        </Link>

        <Link to={`/user/${user.id}admin-sedes`}>
        <h6 className="nav-link link-light">
            Gestionar Sedes
        </h6>
        </Link>
        </div>
        }

        {user.rolId === 2 && 

        <div>
            
        <Link to={`/user/${user.id}/voluntarios`}>
        <h6 className="nav-link link-light">
            Gestionar voluntarios
        </h6>
        </Link>
            
        <Link to={`/user/${user.id}/entregas}`}>
        <h6 className="nav-link link-light">
            Gestionar entregas
        </h6>
        </Link>
        </div>

        }

        {user.rolId >= 3 && 
        <div>
        
        <Link to={`/user/${user.id}/misbloques`}>
        <h6 className="nav-link link-light">
            Mis Bloques
        </h6>
        </Link>

        <Link to={`/user/${user.id}/misentregas`}>
        <h6 className="nav-link link-light">
            Mis Entregas
        </h6>
        </Link>
        </div>
        }
        </div>
    )
}

export default Links