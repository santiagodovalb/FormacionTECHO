import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Row, Col } from "antd";
import "./index.css";

export default function ListaSedes() {
  const sedes = useSelector((state) => state.sedes);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  if (user.rolId && user.rolId !== 1) {
    history.push("/unauthorized");
    return (
      <>
        <h1>No autorizado</h1>
      </>
    );
  }

  return (
    <div>
      <Row>
        {sedes.map((sede) => {
          return (
            <Col flex={1} span={4} offset={5} pull={2}>
              <Link to={`/admin-usuarios/sede/${sede.id}`}>
                <button
                  className="mb-3 mt-3 p-3 fs-3 button-style light-blue"
                  type="button"
                >
                  {sede.nombre}
                </button>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
