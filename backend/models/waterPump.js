const mongoose = require('mongoose')

const WaterPumpScheme = new mongoose.Schema({
    dateHour:{
        hour:{type:String},
        date:{type:String}
    }
});
module.exports = mongoose.model('WaterPump', WaterPumpScheme);