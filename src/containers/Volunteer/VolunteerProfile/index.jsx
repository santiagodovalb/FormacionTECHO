import React from "react";
import Sidebar from "../../../components/Sidebar";
import "./styles.css"


const VolunteerProfile = () => {

    return (
        <>
            <div>
                <Sidebar />
                <div className="volunteer_profile_div">
                    <img src="https://lh3.googleusercontent.com/a-/AOh14GhqiZWNcrJRbnPnH1vN92s-TmomuS6Hsk95QsTioA=s576-p-rw-no" alt="volunteer" />
                    <h2>Santiago Videla</h2>
                    <h5>Rol</h5>
                    <p>Coordinador de comunidad</p>
                    <h5>Sede</h5>
                    <p>Buenos Aires</p>
                </div>
            </div>
        </>
    );
};

export default VolunteerProfile;