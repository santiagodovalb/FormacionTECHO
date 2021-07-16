import React from 'react';
import { useEffect } from 'react';
import Sidebar from '../../../components/SideBar';
import Users from './Users'

function AdminUsers () {

    return (
        <div>
            <h1>Administrar roles de usuarios</h1>
            <h2></h2>
            <Users />
        </div>    
    )
}

export default AdminUsers