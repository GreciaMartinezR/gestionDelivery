const DeliveryController = require('../controllers/delivery.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.get('/api/delivery', authenticate, DeliveryController.getAllDelivery);
    app.post('/api/delivery', authenticate, DeliveryController.createDelivery);
    app.get('/api/delivery/:id', authenticate, DeliveryController.getDelivery); //Para ver detalles
    app.delete('/api/delivery/:id', authenticate, DeliveryController.deleteDelivery); //Para eliminar
    app.put('/api/delivery/:id', authenticate, DeliveryController.updateDelivery); //Para editar
}