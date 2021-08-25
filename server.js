const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const { usuarioAdmin } = require('./server/controllers/users.controller');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

require("./server/config/mongoose.config");

app.use( cookieParser() );

app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/file', upload.single('file'), function (req, res, next) {
    console.log('FILE',req.file);
    res.json({ok: true});
})

require('./server/routes/users.routes')(app);
require('./server/routes/delivery.routes')(app);
// usuarioAdmin();

const server = app.listen(8000, () => console.log("Servidor de Gestion de Delivery Conectado"));