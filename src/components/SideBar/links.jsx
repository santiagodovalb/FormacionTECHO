import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsFiles } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import {FaPen} from 'react-icons/fa';
import {FaUsers} from 'react-icons/fa';
import {FaEdit} from 'react-icons/fa';


function Links () {

    const user = useSelector(state => state.user)

    return (
        <div>
        
        {!user.rolId && ''}

        {user.rolId === 1 &&

        <div>
        <Link to={`/admin-crear-gestor`}>
        <h6 className="nav-link link-light">
            <FaEdit />   Crear Gestor
        </h6>

        <Link to={`/admin-bloques`}>
        <h6 className="nav-link link-light">
            <BsFiles />   Gestionar Bloques
        </h6>
        </Link>

        </Link>

        <Link to={`/admin-usuarios`}>
        <h6 className="nav-link link-light">
            <FaUsers />   Gestionar Usuarios
        </h6>
        </Link>

        <Link to={`/admin-sedes`}>
        <h6 className="nav-link link-light">
            <MdLocationOn />   Gestionar Sedes
        </h6>
        </Link>

        <Link to={`/admin-roles`}>
        <h6 className="nav-link link-light">
            Gestionar Roles
        </h6>
        </Link>
        </div>
        }

        {user.rolId === 2 && 

        <div>
            
        <Link to={`/voluntarios`}>
        <h6 className="nav-link link-light">
            <FaUsers />   Ver voluntarios
        </h6>
        </Link>
            
        <Link to={`/entregas}`}>
        <h6 className="nav-link link-light">
            <FaPen />   Gestionar entregas
        </h6>
        </Link>
        </div>

        }

        {(user.rolId && user.rolId > 2 || user.rolId === null ) && 
        <div>
        
        <Link to={`/mis-bloques`}>
        <h6 className="nav-link link-light">
            <BsFiles />   Mis Bloques
        </h6>
        </Link>

        <Link to={`/mis-entregas`}>
        <h6 className="nav-link link-light">
           <FaPen />   Mis Entregas
        </h6>
        </Link>

        <Link to={`/sede`}>
        <h6 className="nav-link link-light">
           <MdLocationOn />   Elegir o modificar sede
        </h6>
        </Link>
        </div>
        }
        </div>
    )
}

export default Links