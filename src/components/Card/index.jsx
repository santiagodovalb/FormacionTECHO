import React from "react";
import './styles.css'


const Card = () => {

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <img src="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg" alt="" />
                <div className="card-body">
                    <h5 class="card-title">Titulo del bloque</h5>
                    <a href="?" class="btn btn-primary">Ver modulos</a>
                </div>
            </div>
        </>
    );
};

export default Card;