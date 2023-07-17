const WaterPump = require('../models/waterPump');

const waterPumpController = {
    getEvents : async (req,res) => {
        const data = await WaterPump.find();
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

module.exports = waterPumpController;