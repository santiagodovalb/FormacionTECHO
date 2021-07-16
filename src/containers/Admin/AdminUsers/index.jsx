import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Users from './Users'

function AdminUsers () {

    return (
        <div>
            <h1>Administrar roles de usuarios</h1>
            <Users />
        </div>    
    )
}

export default AdminUsers