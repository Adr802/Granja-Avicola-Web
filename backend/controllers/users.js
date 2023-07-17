const User = require('../models/user');

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
    }
}

module.exports = userController;