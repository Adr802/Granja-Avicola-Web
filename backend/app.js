
const express=require('express');
const app=express();
const {mongoose} = require('./config/database')
const morgan=require('morgan');

const Data = require('./models/data')

//const cors = require('cors');

//settings
app.set('nombreApp', 'Aplicacion para la gestion de una granja Avicola'); 
app.set('puerto',process.env.PORT|| 3000);

app.use(express.json());

//middleware
app.use(morgan('dev')); 
//app.use(cors({origin: 'http://localhost:4200'}));

//routes
//app.use('/api',require('./routes/users'));
app.use('/api/data',require('./routes/data'));
//app.use('/api',require('./routes/waterPump'));


app.listen(app.get('puerto'), ()=>{

    console.log(app.get('nombreApp')); 
    console.log('http://localhost:', app.get('puerto'));
})
/*
const crearData = () =>{
    Data.create(
        {
            "temp": 18.3,
            "hum": 30,
            "waterLevel": 50,
            "dateHour": {
              "hour": "10:52",
              "date": "17/07/2023"
            }
          }
    )
    console.log("Data creada?")
};

crearData();
*/
