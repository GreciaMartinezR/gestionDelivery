const UsersController = require("../controllers/users.controller");

module.exports = function(app){
    
    app.post("/api/registro", UsersController.registro);
    app.post("/api/login", UsersController.login);

}