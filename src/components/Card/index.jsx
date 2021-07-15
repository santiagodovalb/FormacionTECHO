import React from "react";
import './styles.css'


const Card = () => {

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <img src="https://cdn.theatlantic.com/media/mt/science/cat_caviar.jpg" className="card-img-top" alt="block" />
                <div className="card-body">
                    <h5 class="card-title">Titulo del bloque</h5>
                    <a href="?" class="btn btn-primary">Ver modulos</a>
                </div>
            </div>
        </>
    );
};

export default Card;