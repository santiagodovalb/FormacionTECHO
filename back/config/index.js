const express = require("express");
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

module.exports = (app) => {

  //15 middlewares inteligentes que mejoran la seguridad de los headers requests
  app.use(helmet());

  //Evita problemas con el acceso CORS cuando hacemos peticiones AJAX desde un front a un back con puertos diferentes.
  app.use(cors());

  //Permite configurar cookies en nuestro servidor
  app.use(cookieParser());
  
  //Convierte los body request en formato JSON
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //Permite ver en la consola los request del cliente y los reponses del servidor
  app.use(volleyball);

};