import React from "react";
import Sidebar from "../../../components/SideBar";
import { useSelector } from "react-redux";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

const VolunteerProfile = () => {
  const [rol, setRol] = useState({});
  const [sede, setSede] = useState({});
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.sedeId) {
      axios
        .get(`/api/sedes/${user.sedeId}`)
        .then((res) => res.data)
        .then((sede) => setSede(sede));
    }

    if (user.rolId) {
      axios.get(`/api/roles/${user.rolId}`).then((res) => setRol(res.data));
    }
  }, [user.rolId]);

  return (
    <>
      <div>
        <div className="volunteer_profile_div">
          <img src={user.img} alt="volunteer" />
          <h2>{user.full_name}</h2>
          {/* <h4>Rol</h4> */}
          <p className="fs-4">
            {user.rolId
              ? rol.tipo
              : "Por favor, pongase en contacto con su gestor para que se le asigne un rol"}
          </p>
          {/* <h5>Sede</h5> */}
          <p className="fs-4">
            {sede.nombre ? sede.nombre : "Debes elegir una sede"}
          </p>
        </div>
      </div>
    </>
  );
};

export default VolunteerProfile;
