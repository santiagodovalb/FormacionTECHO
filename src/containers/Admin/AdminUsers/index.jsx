import React from 'react';
import { useEffect } from 'react';
import Sidebar from '../../../components/SideBar';
import Sedes from './Sedes';
import Users from './Users'

function AdminUsers () {

    return (
        <div>
            
            <h2>Acceder a una sede para ver sus voluntarios y gestores</h2>
            <Sedes />
        </div>    
    )
}

export default AdminUsers