const mongoose = require('mongoose')

const WaterPumpScheme = new mongoose.Schema({
    dateHour:{
        hour:{type:string},
        date:{type:string}
    }
});
module.exports = mongoose.model('WaterPump', WaterPumpScheme);