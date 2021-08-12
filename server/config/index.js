const express = require("express");
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (app) => {

  app.use(cors());

  app.use(cookieParser());
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(volleyball);

};