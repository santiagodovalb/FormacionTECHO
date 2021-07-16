import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Sidebar from '../../../components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminContent = () => {

    const history = useHistory();
  
    const user = useSelector((state) => state.user);
  
    if (user.rolId && user.rolId !== 1) {
      history.push("/unauthorized");
      return <><h1>No autorizado</h1></>;
    }

    return (
        <>
        <div>
            <Sidebar />
            <div className="admin_content_div">
                <h1>ESTA VIEW ES SOLO DE ADMIN</h1>
            </div>
        </div>
        </>
    )
}

export default AdminContent;