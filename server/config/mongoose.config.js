const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/deliverydb", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Conexión exitosa con la base de datos"))
	.catch(err => console.log("Error al conectar la base de datos", err));