import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';


const GestorContent = () => {

    const history = useHistory();
  
  
    const user = useSelector((state) => state.user)
  
    if (user.rolId && user.rolId !== 2) {
      history.push("/unauthorized");
      return <><h1>No autorizado</h1></>;
    }

    return (
        <>
        <div>
            <div className="admin_content_div">
                <h1>ESTA VIEW ES SOLO DE GESTOR</h1>
            </div>
        </div>
        </>
    )
}

export default GestorContent;

