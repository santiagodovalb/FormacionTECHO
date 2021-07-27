import React from 'react';
import ListaSedes from './ListaSedes';
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux';
import useAuthorize from '../../../utils/authorization';

function AdminUsers () {

    const history = useHistory()
    const user = useSelector(state => state.user)

    useAuthorize(user, 1)

    return (
        <div>
            
            <h2>Acceder a una sede para ver sus voluntarios y gestores</h2>
            <ListaSedes />
        </div>    
    )
}

export default AdminUsers