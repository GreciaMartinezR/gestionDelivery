const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: [true, "El nombre del cliente es requerido"]
    },
    userEmail: {
      type: String,
      required: [true, "El correo electrónico del cliente es requerido"]
    },
    userAddress: {
      type: String,
      required: [true, "La dirección del cliente es requerida"]
    },
    userPhone: {
        type: String,
        required: [true, "Debe ingresar un número telefónico de contacto"]
      },
    userPassword: {
      type: String,
      required: [true, "Debe ingresar su contraseña"],
      minleght: [8, "La contraseña debe tener 8 caracteres o más"]
    },
    userType: {
      type: String,
      default: "Client"
    }
  },
{timestamps: true});

UsersSchema.virtual('userConfirmPassword')
  .get( () => this._userConfirmPassword )
  .set( value => this._userConfirmPassword = value );

UsersSchema.pre('validate', function(next) {
  if (this.userPassword !== this.userConfirmPassword) {
    this.invalidate('userConfirmPassword', 'Las contraseñas deben ser iguales');
  }
  next();
});

UsersSchema.pre('save', function(next) {
  bcrypt.hash(this.userPassword, 10)
    .then(hash => {
      this.userPassword = hash;
      next();
    });
});

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;