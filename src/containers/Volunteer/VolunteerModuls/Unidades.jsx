import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Checkbox from "antd/lib/checkbox/Checkbox";
import "./VolunteerModules.css";

export default function Unidades({ setChecks }) {
  const [unidades, setUnidades] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/unidades/bloque/${id}`)
      .then((res) => res.data)
      .then((data) => setUnidades(data));
  }, [id]);

  const handleChange = (e) => {
    console.log("click");
    const status = e.target.checked;
    localStorage.setItem(e.target.id, status ? "true" : "false");
    setChecks();
  };

  const handleClick = (e) => {
    localStorage.setItem(e.target.id, "true");
    setChecks();
  };

  return (
    <div>
      {unidades.map((unidad) => {
        return (
          <div key={`unidad-${unidad.id}`}>
            <a
              href={`${unidad.link}`}
              target="_blank"
              rel="noreferrer"
              className="modul_button"
            >
              <button
                className="my-3 p-3 fs-4 button-style light-blue"
                id={`unidad${unidad.id}`}
                onClick={handleClick}
              >
                {unidad.titulo}
              </button>
            </a>
            <Checkbox
              disabled={
                localStorage.getItem(`unidad${unidad.id}`) === "true"
                  ? false
                  : true
              }
              defaultChecked={
                localStorage.getItem(`check${unidad.id}`) === "true"
                  ? true
                  : false
              }
              onChange={handleChange}
              id={`check${unidad.id}`}
            >
              Completado
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
}
