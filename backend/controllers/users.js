const User = require('../models/user');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userController = {
    getUsers: async (req, res) => {
        const data = await User.find();
        res.json(data)
    },
    getUser: async (req, res) => {
        // Convertir el valor del ID a ObjectId
        const userId = req.params.id;
        //console.log(userId)
        // Utilizar new al crear una instancia de ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        User.findById(objectId)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                return res.status(200).json(user);
            })
            .catch((err) => {
                return res.status(500).json({ message: 'Error en el servidor', error: err });
            });
    },
    addUser: async (req, res) => {
        console.log(req.body);

        const { cedula, name, phone, rol, email, pass } = req.body;
        const newUser = new User({
            cedula: cedula,
            name: name,
            phone: phone,
            role: rol,
            email: email,
            pass: pass
        });
        console.log(newUser);
        await newUser.save();
        const token = jwt.sign({ _id: newUser._id }, 'secretkey');
        res.status(200).json({ token })
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send("El correo no existe")
        }
        console.log(password);
        if (user.pass != password) {
            return res.status(401).send('Contrasena incorrecta');
        }

        const token = jwt.sign({ _id: user._id }, 'secretkey');
        res.status(200).json({ token })
    }
}

module.exports = userController;