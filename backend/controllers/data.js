const Data = require('../models/data');

const dataController = {
    getTemperature: async (req, res) => {
        try {
          // Obtener los datos ordenados por la temperatura de forma descendente y limitar a 10 resultados
          const data = await Data.find().sort({ temp: -1 }).limit(10);
          res.json(data);
        } catch (err) {
          console.error('Error al obtener los datos:', err);
          res.status(500).json({ error: 'Error al obtener los datos desde la base de datos.' });
        }
    },
    getHumedad: async (req, res) => {
        try {
          // Obtener los datos ordenados por la temperatura de forma descendente y limitar a 10 resultados
          const data = await Data.find().sort({ hum: -1 }).limit(10);
          res.json(data);
        } catch (err) {
          console.error('Error al obtener los datos:', err);
          res.status(500).json({ error: 'Error al obtener los datos desde la base de datos.' });
        }
    }
}

module.exports = dataController;