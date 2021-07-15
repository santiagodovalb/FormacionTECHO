import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/login";
import { sectionStyle } from "./style";
import Logo from "../../assets/logo.png";
import { useHistory } from "react-router";

const Login = () => {
  const  dispatch = useDispatch()
  const history = useHistory()
  const [form, setForm] = useState({});
  const [other, setOther] = useState("");

  const onChange = (e) => {
    const { target } = e;
    setForm({ ...form, [target.name]: target.value });
    
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser(form))
    .then(user => {
      history.push(`/user/${user.payload.id}`)})
  };

  const onOtherSubmit = (e) => setOther(e.target.id);

  useEffect(() => {
    Object.keys(form).map((key) => console.log(`[${key}] : ${form[key]}`));
    console.log(`${other}`);
  }, [form, other]);

  return (
    <div
      className="wh-100 m-0 row justify-content-center align-items-center"
      style={sectionStyle}
    >
      <div className="col-auto text-center loggin-container p-5">
        <img src={Logo} className="m-4 form-logo" alt="" />
        <div className="m-4">
          <i className="bi bi-person-circle form-img" />
        </div>
        <form className="pb-3" onChange={onChange} onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Correo"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Contraseña"
            />
          </div>
          <button type="submit" className="btn btn-secondary mt-3">
            Ingresar
          </button>
          <div className="m-3" onClick={onOtherSubmit}>
          </div>
          <div className=" fs-8 mt-5">
            <strong>
              <a href="url" className="text-light">
                ¿Olvidaste tu contraseña?
              </a>
            </strong>
          </div>
        </form>
            <a href="http://localhost:3001/api/auth/google"> 
            <button id="Google" className="btn btn-danger mb-3">
              Ingresar con Google
            </button>
            </a>
            <br />
            <a href="http://localhost:3001/api/auth/facebook" > 
            <button id="Facebook" className="btn btn-primary">
              Ingresar con Facebook
            </button>
            </a>
      </div>
    </div>
  );
};

export default Login;
