const express = require("express");
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

module.exports = (app) => {

  app.use(helmet());

  app.use(cors({ allowedHeaders: "*", origin: '*'}));

  app.use(cookieParser());
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(volleyball);

};