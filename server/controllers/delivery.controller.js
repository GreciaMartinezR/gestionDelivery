const { Delivery } = require('../models/delivery.model');

    // Método para crear pirata
module.exports.createDelivery = (request, response) => {
    console.log("INGRESO A CREATE DELIVERY")
    const { clientName, clientAddress, clientEmail, clientPhone, productClient, dateClient, timeClient, nameProductI, destinoProductI, nameProductII, destinoProductII, nameProductIII, destinoProductIII, nameProductIV, destinoProductIV, nameProductV, destinoProductV} = request.body;
    Delivery.create({
        clientName,
        clientAddress,
        clientEmail,
        clientPhone,
        productClient,
        dateClient,
        timeClient,
        nameProductI,
        destinoProductI,
        nameProductII,
        destinoProductII,
        nameProductIII,
        destinoProductIII,
        nameProductIV,
        destinoProductIV,
        nameProductV,
        destinoProductV,
    })
        .then(delivery => {
        console.log("Aqui", delivery)

        return response.json(delivery)
        
    })
    
        .catch(err => {
        console.log("Error", err)
    
        return response.json(err)
    });
}

    // Método para obtener lista de piratas
module.exports.getAllDelivery = (request, response) => {
    Delivery.find({})
        .then(delivery => response.json(delivery))
        .catch(err => response.json(err))
    }


    //Método para ver detalles
module.exports.getDelivery = (request, response) => {
    Delivery.findOne({_id:request.params.id})
        .then(delivery => response.json(delivery))
        .catch(err => response.json(err))
}

    //Método para eliminar
module.exports.deleteDelivery = (request, response) => {
    Delivery.deleteOne({ _id: request.params.id })
        .then(delivery => response.json(delivery))
        .catch(err => response.json(err))
}

    //Método para editar
module.exports.updateDelivery = (request, response) => {
    Delivery.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(delivery => response.json(delivery))
        .catch(err => response.json(err))
}