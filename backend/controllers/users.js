const User = require('../models/user');
const jwt = require('jsonwebtoken')

const userController = {
    getUsers : async (req,res) => {
        const data = await User.find();
        res.json(data)
        
        /*await Data.find().then(docs => {
            // Paso 5: Obtener los datos
            //console.log(docs);
            res.json(docs);
        }).catch(err => {
            console.error('Error al obtener los datos:', err);
        });*/
    },
    addUser : async(req,res)=>{
    console.log(req.body);

    const{cedula, nombre, telefono, email,password, rol} = req.body;
    const newUser = new User({
                            cedula:cedula,
                            name:nombre,
                            phone: telefono,
                            email:email,
                            pass:password,
                            role: rol});
    console.log(newUser);
    await newUser.save();
    const token = jwt.sign({ _id:newUser._id }, 'secretkey');
    res.status(200).json({token})
    },
    loginUser : async(req,res)=>{
    const {email,password} = req.body;
    const user= await User.findOne({email});

    if(!user){
        return res.status(401).send("El correo no existe")
    }
    console.log(password);
    if(user.pass != password){
        return res.status(401).send('Contrasena incorrecta');
    }

    const token=jwt.sign({_id:user._id},'secretkey');
    res.status(200).json({token})
    }
}

module.exports = userController;