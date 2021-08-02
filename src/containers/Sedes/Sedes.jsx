import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setUser } from "../../redux/user";
import axios from "axios";
import SedeCard from "./SedeCard";
import "./Sedes.css";

const Sedes = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const sedesPrueba = useSelector((state) => state.sedes);
  const [form, setForm] = useState({});
  const [sedes, setSedes] = useState([]);
  const [selectSede, setSelectSede] = useState("");
  const [stateIcon, setStateIcon] = useState({
    key: "",
    style: "btn bi bi-check-circle-fill check-style",
  });
  
  useEffect(() => {
    if (!sedes.length) setSedes([...sedesPrueba]);
    setStateIcon(s => {
      return {
      ...s,
      key: selectSede,
    }});
  }, [form, selectSede, sedes, sedesPrueba]);
  
  const handleChange = (e) => {
    const { target } = e;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (form.search && form.search.length)
      setSedes(
        sedesPrueba.filter(
          (sede) =>
            sede.nombre.toLowerCase().indexOf(form.search.toLowerCase()) >= 0
        )
      );
    else {
      setSedes(sedesPrueba);
      setStateIcon({
        ...stateIcon,
        key: "",
      });
    }
  };

  const onSaveSede = () => {
    axios
      .put(`/api/users/${user.id}`, { sedeId: selectSede })
      .then((res) => {
        return res.data;
      })
      .then((user) => {
        dispatch(setUser(user));
        history.push("/user");
      })
      .catch((err) => err);
  };


  return (
    <div className="div-sedes">
        
          <h1 className="fs-3 text-secondary p-5 title">
            <strong>Elegí tu sede</strong>
          </h1>

        <div className="justify-content-center align-items-center">
          <form
            className="d-flex col-auto text-center"
            onChange={handleChange}
            onSubmit={handleSearch}
          >
            <input
              type="text"
              name="search"
              className="form-control me-2 fs-4"
              placeholder="Buscar sede"
            />
            <button className="btn btn-outline-secondary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        <div className="sedes mt-5">
          {sedes?.map((sede, index) => {
            return (
              <SedeCard
                key={`${sede.id}`}
                id={`${sede.id}`}
                button={{
                  text: `${sede.nombre}`,
                  styles: "button-style  light-blue fs-5",
                }}
                icon="btn bi bi-circle-fill uncheck-style"
                setState={setSelectSede}
                stateIcon={stateIcon}
              />
            );
          })}
        </div>
        <div className=" guardarButton ">
          <button
            className="mb-3 mt-3 p-4 fs-4 button-style green"
            onClick={onSaveSede}
          >
            Guardar
          </button>
        </div>
      
    </div>
  );
};

export default Sedes;
