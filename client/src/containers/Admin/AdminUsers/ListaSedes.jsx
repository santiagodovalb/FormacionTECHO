import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AdminUsers.css";
import useAuthorize from "../../../utils/authorization";

export default function ListaSedes() {
  const sedes = useSelector((state) => state.sedes);
  const user = useSelector((state) => state.user);

  useAuthorize(user, 1);

  return (
    <div>
      <div className="wh-100 row justify-content-center align-items-center m-5 p-5">
        {sedes.map((sede) => {
          return (
            <div key={sede.id} className="col-auto">
              <Link to={`/admin-usuarios/sede/${sede.id}`}>
                <button
                  className="m-3 p-4 fs-5 button-style light-blue"
                  type="button"
                >
                  {sede.nombre} <i className="bi bi-pencil-square"></i>
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
