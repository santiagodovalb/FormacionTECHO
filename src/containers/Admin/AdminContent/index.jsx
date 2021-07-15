import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Sidebar from '../../../components/Sidebar';
import { setUserLogged } from '../../../redux/login';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminContent = () => {

    const dispatch = useDispatch();
    const history = useHistory();
  
    useEffect(() => {
      dispatch(setUserLogged());
    }, [dispatch]);
  
    const user = useSelector((state) => state.user);
  
    if (user.loggedIn === null) {
      return <></>;
    }
    if (user.loggedIn === false || user.roleId !== 1) {
      history.push("/");
      return <></>;
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