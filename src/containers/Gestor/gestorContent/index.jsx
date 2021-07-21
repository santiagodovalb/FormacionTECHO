import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updatePassword } from '../../../redux/users';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import "./styles.css"




const GestorContent = () => {
    const [form, setForm] = useState({password: '', newPassword: '', newPasswordConfirm: ''})
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)


    if (user.rolId && user.rolId !== 2) {
      history.push("/unauthorized");
      return <><h1>No autorizado</h1></>;
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        if(form.password === user.password && form.newPassword === form.newPasswordConfirm){
            console.log("TODO OK")
            console.log(form.newPassword)
            await dispatch(updatePassword({id: user.id, password: form.newPassword}))
        } else {
            console.log("TODO MAL")
        }
    }

    return (
        <>
        <div className="change_password_div">
            <h1>Cambiar contraseña</h1>
            <form onSubmit={onSubmit}>

                <p>Contraseña actual: </p>
                <input type="password" name="password" id="" onChange={onChange} />

                <p>Nueva contraseña: </p>
                <input type="password" name="newPassword" id="" onChange={onChange}/>

                <p>Confirma nueva contraseña: </p>
                <input type="password" name="newPasswordConfirm" id="" onChange={onChange}/>

                <button type='submit'>Cambiar</button>
            </form>
        </div>
        </>
    )
}

export default GestorContent;

