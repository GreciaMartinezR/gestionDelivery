const mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/deliverydb", {
mongoose.connect("mongodb+srv://deliverydb:delivery123@cluster0.sa7ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Conexión exitosa con la base de datos"))
	.catch(err => console.log("Error al conectar la base de datos", err));