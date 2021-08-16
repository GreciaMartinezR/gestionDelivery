const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const { usuarioAdmin } = require('./server/controllers/users.controller');

require("./server/config/mongoose.config");

app.use( cookieParser() );

app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./server/routes/users.routes')(app);
require('./server/routes/delivery.routes')(app);
//usuarioAdmin();

const server = app.listen(8000, () => console.log("Servidor de Gestion de Delivery Conectado"));