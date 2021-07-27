import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setUser } from "../../redux/user";
import axios from "axios";
import Card from "../../components/Card";
import localPeru from "../../assets/sedes/lima-peru.png";
import "./style.css";

const Sede = () => {
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
    setStateIcon({
      ...stateIcon,
      key: selectSede,
    });
  }, [form, selectSede, sedes]);

  const onChange = (e) => {
    const { target } = e;
    setForm({ ...form, [target.name]: target.value });
  };

  const onSearch = (e) => {
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
    console.log("Sede", selectSede);
    axios
      .put(`/api/users/${user.id}`, { sedeId: selectSede })
      .then((res) => res.data)
      .then((user) => {
        console.log("USER", user[1][0]);
        dispatch(setUser(user[1][0]));
      })
      .then(() => history.push("/user"))
      .catch((err) => err);
  };

  useEffect(() => {
    if (!sedes.length) setSedes([...sedesPrueba]);
    setStateIcon({
      ...stateIcon,
      key: selectSede,
    });
  }, [form, selectSede, sedes]);

  return (
    <div className="div-sedes">
      <div className="row justify-content-center align-items-center">
        <div>
          <h1 className="p-5 fs-1 title">
            <strong>Elige tu sede</strong>
          </h1>
        </div>
        <div className="row justify-content-center align-items-center">
          <form
            className="d-flex col-auto text-center"
            onChange={onChange}
            onSubmit={onSearch}
          >
            <input
              type="text"
              name="search"
              className="form-control me-2 fs-3"
              placeholder="Buscar sede"
            />
            <button className="btn btn-outline-secondary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        <div className="row justify-content-center align-items-center mt-5">
          {sedes?.map((sede, index) => {
            return (
              <Card
                key={`${sede.id}`}
                id={`${sede.id}`}
                img={localPeru}
                button={{
                  text: `${sede.nombre}`,
                  styles: "button-style light-blue fs-4",
                }}
                icon="btn bi bi-circle-fill uncheck-style"
                setState={setSelectSede}
                stateIcon={stateIcon}
              />
            );
          })}
        </div>
        <div className="col-auto">
          <button
            className="mb-3 mt-3 p-4 fs-4 button-style green"
            onClick={onSaveSede}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sede;
