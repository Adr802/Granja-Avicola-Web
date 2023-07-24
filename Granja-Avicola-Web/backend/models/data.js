const mongoose = require('mongoose')

const DataScheme = new mongoose.Schema({
    temp: {
        type: Number,
    },
    hum:{
        type: Number
    },
    waterLevel: {
        type: Number
    },
    dateHour:{
        hour:{type:String},
        date:{type:String}
    }
});
module.exports = mongoose.model('Data', DataScheme);