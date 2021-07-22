import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Checkbox from "antd/lib/checkbox/Checkbox";
import "./style.css";

export default function Unidades({ setChecks }) {
  const [unidades, setUnidades] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/unidades/bloque/${id}`)
      .then((res) => res.data)
      .then((data) => setUnidades(data));
  }, []);

  const handleChange = (e) => {
    console.log("click");
    const status = e.target.checked;
    localStorage.setItem(e.target.id, status ? "true" : "false");
    setChecks();
  };

  return (
    <div>
      {unidades.map((unidad) => {
        const id = `check${unidad.id}`;
        return (
          <div key={`unidad${unidad.id}`}>
            <a href={`${unidad.link}`}>
              <Checkbox
                defaultChecked={
                  localStorage.getItem(id) === "true" ? true : false
                }
                onChange={handleChange}
                id={id}
              ></Checkbox>{" "}
              <button
                className="btn btn-outline-secondary"
                id={`unidad${unidad.id}`}
              >
                {unidad.titulo}
              </button>
            </a>
          </div>
        );
      })}
    </div>
  );
}
