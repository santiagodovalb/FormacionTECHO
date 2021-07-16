import React from "react";
import Sidebar from "../../../components/SideBar";
import { useSelector } from "react-redux";
import "./styles.css"
import { useEffect, useState } from "react";
import axios from "axios";


const VolunteerProfile = () => {

    const [rol, setRol] = useState({})
    const user = useSelector(state => state.user)
    const newUser = function(rolId, sedeId){
        if(rolId == null || sedeId == null){
            return <p>Por favor, pongase en contacto con su gestor para que se le asigne un rol y/o una sede</p>
        }
    }

    useEffect(()=>{
        return axios.get(`/api/roles/${user.rolId}`)
            .then(res => {
                setRol(res.data) })
    },[user.rolId])

    return (
        <>
            <div>
                <div className="volunteer_profile_div">
                    <img src={user.img} alt="volunteer" />
                    <h2>{user.full_name}</h2>
                    <h5>Rol</h5>
                    <p>{rol.tipo}</p>
                    <h5>Sede</h5>
                    <p>{user.sedeId}</p>
                    {newUser(user.rolId, user.sedeId)}
                </div>
            </div>
        </>
    );
};

export default VolunteerProfile;