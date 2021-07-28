import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import useAuthorize from "../../../utils/authorization";

export default function AdminBloques() {
  const user = useSelector((state) => state.user);

  const bloques = useSelector((state) => state.bloques);

  useAuthorize(user, 1);

  return (
    <div className="wh-100 m-0 row justify-content-center align-items-center">
      <div className="col-auto m-5">
        <h1 className="fs-2 text-secondary">
          <strong>Gestionar o crear bloques</strong>
        </h1>
        <Link to="/admin-bloques-crear">
          <button type="button" className="my-5 p-3 fs-3 button-style green">
            Crear nuevo bloque
          </button>
        </Link>
      </div>
      <div className="wh-100 my-3 row justify-content-center align-items-center">
        {bloques.map((bloque) => {
          return (
            <div className="col-auto">
              <Link to={`/admin-bloques/${bloque.id}`}>
                <button
                  type="button"
                  className="my-3 p-3 fs-3 button-style light-blue"
                >
                  {bloque.titulo}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
