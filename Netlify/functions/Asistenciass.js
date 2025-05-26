var express = require("express");
var cors = require("cors");
var serverless = require("serverless-http");
var port = process.env.PORT || 5000;

var app = express();
var router = express.Router();

var asistenciasroutes = require("../../backend/routes/asistenciastesroutes.js");

app.use(express.json());
app.use(cors());

router.use("/asistenicas", estudiantesroutes);
app.use("/.netlify/functions", router);

module.exports.handler = serverless(app);
