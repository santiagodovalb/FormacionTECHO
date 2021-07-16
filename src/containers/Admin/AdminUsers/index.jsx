import React from 'react';
import Sidebar from '../../../components/SideBar';
import Users from './Users'

function AdminUsers () {

    return (
        <div>
            <Sidebar />
            <h1>Administrar roles de usuarios</h1>
            <Users />
        </div>    
    )
}

export default AdminUsers