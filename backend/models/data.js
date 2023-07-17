const mongoose = require('mongoose')

const DataScheme = new mongoose.Schema({
    temp: {
        type: Number,
    },
    Hum:{
        type: Number
    },
    waterLevel: {
        type: Number
    },
    dateHour:{
        hour:{type:string},
        date:{type:string}
    }
});
module.exports = mongoose.model('Data', DataScheme);