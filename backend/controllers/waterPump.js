const WaterPump = require('../models/waterPump');

const waterPumpController = {
    getEvents : async (req, res) => {
        try {
            const count = await WaterPump.countDocuments(); // Obtiene el número total de registros en la colección
            res.json({ count });
        } catch (err) {
            console.error('Error al obtener los eventos:', err);
            res.status(500).json({ error: 'Error al obtener los eventos desde la base de datos.' });
        }
    }
}

module.exports = waterPumpController;