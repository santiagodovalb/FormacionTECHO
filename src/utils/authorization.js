import { useHistory } from "react-router";
import React from 'react'

export default function useAuthorize(user, permitted) {

    const history = useHistory()

      if (user.full_name && (user.rolId === null || user.rolId !== permitted)) {
          history.push("/unauthorized");
          return <h1>No autorizado</h1>;
      }
}