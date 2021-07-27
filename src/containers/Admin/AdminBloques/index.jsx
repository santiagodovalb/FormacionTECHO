import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

export default function AdminBloques() {
  const bloques = useSelector((state) => state.bloques);

  return (
    <div className="admin">
      <h1>Gestionar o crear bloques</h1>
      <Link to="/admin-bloques-crear">
        <button type="button" className="mb-3 mt-3 p-3 fs-3 button-style green">
          Crear nuevo bloque
        </button>
      </Link>
      <br />
      <Row >
        {bloques.map((bloque) => {
          return (
            <Col flex={1} span={4} offset={5} pull={2}>
              <Link to={`/admin-bloques/${bloque.id}`}>
                <button
                  type="button"
                  className="mb-3 mt-3 p-3 fs-3 button-style light-blue"
                >
                  {bloque.titulo}
                </button>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}


