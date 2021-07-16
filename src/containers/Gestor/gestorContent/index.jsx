import Sidebar from "../../../components/Sidebar/index";
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
  
    const user = useSelector((state) => state.user)
    console.log("IDD", user)
  
    if (user.rolId !== 2) {
      history.push("/unauthorized");
      return <><h1>No autorizado</h1></>;
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

