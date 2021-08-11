import React from "react";
import ListaSedes from "./ListaSedes";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import useAuthorize from "../../../utils/authorization";

function AdminUsers() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useAuthorize(user, 1);

  if (user.rolId && user.rolId !== 1) {
    history.push("/unauthorized");
    return (
      <>
        <h1>No autorizado</h1>
      </>
    );
  }

  return (
    <div className="admin">
      <h1 className="fs-2 text-secondary">
        <strong>Accedé a una sede para ver sus voluntarios y gestores</strong>
      </h1>
      <ListaSedes />
    </div>
  );
}

export default AdminUsers;
