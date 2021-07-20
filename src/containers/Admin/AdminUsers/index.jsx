import React from 'react';
import ListaSedes from './ListaSedes';
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux';

function AdminUsers () {

    const history = useHistory()
    const user = useSelector(state => state.user)

    if (user.rolId && user.rolId !== 1) {
        history.push("/unauthorized");
        return <><h1>No autorizado</h1></>;
      }

    return (
        <div>
            
            <h2>Acceder a una sede para ver sus voluntarios y gestores</h2>
            <ListaSedes />
        </div>    
    )
}

export default AdminUsers