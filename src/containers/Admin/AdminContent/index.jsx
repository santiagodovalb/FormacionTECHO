import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuthorize from "../../../utils/authorization";


const AdminContent = () => {

  
    const user = useSelector((state) => state.user);

    useEffect(() => {}, [user])
  
    useAuthorize(user, 1)

    return (
        <>
        <div>
            <div className="admin_content_div">
                <h1>ESTA VIEW ES SOLO DE ADMIN</h1>
            </div>
        </div>
        </>
    )
}

export default AdminContent;