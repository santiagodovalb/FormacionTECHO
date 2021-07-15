import React from "react";
import Sidebar from "../../../components/SideBar/index";
import { useSelector } from "react-redux";
import "./styles.css"


const VolunteerProfile = () => {

    const user = useSelector(state => state.user)
    console.log(user)
    const newUser = function(rolId, sedeId){
        if(rolId == null || sedeId == null){
            return <p>Por favor, pongase en contacto con su gestor para que se le asigne un rol y una sede</p>
        }
    }

    return (
        <>
            <div>
                <Sidebar />
                <div className="volunteer_profile_div">
                    <img src={user.img} alt="volunteer" />
                    <h2>{user.full_name}</h2>
                    <h5>Rol</h5>
                    <p>{user.rolId}</p>
                    <h5>Sede</h5>
                    <p>{user.sedeId}</p>
                    {newUser(user.rolId, user.sedeId)}
                </div>
            </div>
        </>
    );
};

export default VolunteerProfile;