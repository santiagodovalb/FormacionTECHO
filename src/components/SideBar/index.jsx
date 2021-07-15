import React from "react";
import './styles.css'


const Sidebar = () => {

    return (
        <>
            <div className="sidebar">
                <div className="container">
                    <div className="sidebar-logo">

                    </div>
                    <div className="sidebar-profile">
                        <img src="./assets/profile-picture.png" alt="profile" />
                        <h4>Santiago Videla</h4>
                    </div>
                    <div className="sidebar-links">
                        <a href="?">Mi perfil</a>
                        <a href="?">Mis avances</a>
                        <a href="?">Mis bloques</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
