const Data = require('../models/data');

const dataController = {
    getData : async (req,res) => {
        const data = await Data.find();
        console.log(data);
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

module.exports = dataController;