import Sidebar from "../../../components/SideBar/index";
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setUserLogged } from '../../../redux/login';
import 'bootstrap/dist/css/bootstrap.min.css';


const GestorContent = () => {

    const dispatch = useDispatch();
    const history = useHistory();
  
    useEffect(() => {
      dispatch(setUserLogged());
    }, [dispatch]);
  
    const user = useSelector((state) => state.user);
  
    if (user.loggedIn === null) {
      return <></>;
    }
    if (user.loggedIn === false || user.roleId !== 2) {
      history.push("/");
      return <></>;
    }

    return (
        <>
        <div>
            <Sidebar />
            <div className="admin_content_div">
                <h1>ESTA VIEW ES SOLO DE GESTOR</h1>
            </div>
        </div>
        </>
    )
}

export default GestorContent;

