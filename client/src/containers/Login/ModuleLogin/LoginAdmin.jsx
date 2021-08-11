import React, { useState } from "react";
import "../Login";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/user";

import { useHistory } from "react-router";
import axios from 'axios'
import { message } from 'antd'
import 'antd/dist/antd.css';
import validator from 'validator';



const LoginAdmin = () => {

    const  dispatch = useDispatch()
    const history = useHistory()
    const [form, setForm] = useState({});
  
    const onChange = (e) => {
      const { target } = e;
      setForm({ ...form, [target.name]: target.value });
      
    };
    const isEmail = () => validator.isEmail(form.email)

  
    const onSubmit = (e) => {
      e.preventDefault();
      if(isEmail()) {
      axios.post("/api/users/login", form)
      .then(res => res.data)
      .then(user => {
        return axios.get(`/api/users/${user.id}`)
      })
      .then(res => res.data)
      .then(user => {
        dispatch(setUser(user))
        message.success('Logged in')
        history.push(`/user`)
      })
      .catch(err => {
        message.error('Bad credentials')
        return err
      })
      
    }};
  

    

    return (
        <form className="pb-3" onChange={onChange} onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Correo"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary mt-3">
            Ingresar
          </button>
        </form>
    )

}

export default LoginAdmin;