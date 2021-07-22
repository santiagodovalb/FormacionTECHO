import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.css"
import { useHistory } from "react-router-dom";


const VolunteerProfile = () => {

    const user = useSelector(state => state.user)
    const history = useHistory();

    const handleClick = () => {
        history.push('/sede')
    }

    useEffect(() => {}, [user])

    return (
        <>
            <div>
                <div className="volunteer_profile_div">
                    {console.log(user)}
                    <h2>¡Bienvenido, {user.full_name}!</h2>
                    {user.sedeId ? <h5>Tu sede es: {user.sede?.nombre}</h5> : <button onClick={handleClick}>Debes elegir una sede</button>}
                    {user.rol?.tipo ? <h5>Tu rol es: {user.rol?.tipo}</h5> : <h5>Ponete en contacto con tu gestor para que te asigne un rol</h5>}
                    <h6>¿Como funciona el sitio?</h6>
                    <ul>
                        <li>En mis bloques encontraras todos tus bloques de formacion</li>
                        <li>Dentro de ellos, se encuentran los modulos correspondientes a cada uno</li>
                        <li>Al finalizar un modulo, marcalo como completado</li>
                        <li>Una vez completados todos, se te habilitara la entrega del bloque</li>
                        <li>Para dar un modulo como finalizado, tenes que esperar a que tu gestor apruebe la entrega</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default VolunteerProfile;