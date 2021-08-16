const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    clientName: { 
        type: String, 
        required: [true, "Nombre del cliente o empresa"],
        minlength: [2, "El nombre debe tener 2 caracteres o más"]
    },

    clientAddress: { 
        type: String, 
        required: [true, "Ingrese su dirección"] 
    },

    clientEmail: { 
        type: String, 
        required: [true, "Ingrese su correo electrónico"],
        min: [8, "Ingrese un correo electrónico válido"], 
    },

    clientPhone: { 
        type: String,
        required: [true, "Ingrese su número telefónico"],
        minlength: [6, "Ingrese un número telefónico válido"]
    },

    productClient: { 
        type: Number,
        required: [true, "Máximo 5 productos"],
        min: [1, "Un producto mínimo"],
        max: [5, "Cinco productos máximo"]
    },

    dateClient: { 
        type: Date, 
        required: true,
        min: '2000-01-01', 
        max: '2030-01-01'
    },
    timeClient: { 
        type: Date, 
        required: true,
    },
    nameProductI:{
        type: String,
        required: [true, "Se requiere nombre del producto"]
    },
    destinoProductI:{
        type: String,
        required: [true, "Se requiere dirección de entrega"]
    },
    nameProductII:{
        type: String,

    },
    destinoProductII:{
        type: String,

    },
    nameProductIII:{
        type: String,

    },
    destinoProductIII:{
        type: String,

    },
    nameProductIV:{
        type: String,

    },
    destinoProductIV:{
        type: String,

    },
    nameProductV:{
        type: String,

    },
    destinoProductV:{
        type: String,

    },
    statusDelivery:{
        type: String,
        default: "Iniciado"
    }
}, { timestamps: true });

module.exports.Delivery = mongoose.model('Delivery', DeliverySchema);