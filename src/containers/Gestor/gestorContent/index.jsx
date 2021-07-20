import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
import { format } from 'sequelize/types/lib/utils';


const GestorContent = () => {
    const [form, setForm] = useState()
    const history = useHistory();
  
  
    const user = useSelector((state) => state.user)
    console.log("GESTOR", user)

    if (user.rolId && user.rolId !== 2) {
      history.push("/unauthorized");
      return <><h1>No autorizado</h1></>;
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    console.log(form)
    

    return (
        <>
        <div className="change_password_div">
            <h1>Cambiar contraseña</h1>
            <form>

                <p>Contraseña actual: </p>
                <input type="password" name="" id="" onChange={handleChange} />

                <p>Nueva contraseña: </p>
                <input type="password" name="" id="" onChange={handleChange}/>

                <p>Nueva contraseña: </p>
                <input type="password" name="" id="" onChange={handleChange}/>

                <button type='submit'>Cambiar</button>
            </form>
        </div>
        </>
    )
}

export default GestorContent;

