const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    cedula: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    role: {
        type: ["operator", "admin"],
        default: "operator"
    },
    email: { type: String, require: true, unique: true },
    pass: { type: String, require: true }
});
module.exports = mongoose.model('User', UserScheme);