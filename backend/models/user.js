const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  cedula: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String }, // Corregido el nombre de la propiedad aquí
  email: { type: String, required: true },
  pass: { type: String, required: true }
});

module.exports = mongoose.model('User', UserScheme);
