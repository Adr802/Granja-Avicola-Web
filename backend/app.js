
const express=require('express');
const app=express();
const {mongoose} = require('./config/database')
const morgan=require('morgan');

//importanto modelos pruebas
const Data = require('./models/data')
const User = require('./models/user')
const WaterPump = require('./models/waterPump')

//const cors = require('cors');

//settings
app.set('nombreApp', 'Aplicacion para la gestion de una granja Avicola'); 
app.set('puerto',process.env.PORT|| 3000);

app.use(express.json());

//middleware
app.use(morgan('dev')); 
//app.use(cors({origin: 'http://localhost:4200'}));

//routes
app.use('/api/users',require('./routes/users'));
app.use('/api/data',require('./routes/data'));
app.use('/api/waterpump',require('./routes/waterPump'));


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

const crearUser = () =>{
  User.create(
      {
      
          "cedula": "0850013244",
          "name": "Cristhian Villacres",
          "phone": "0985880440",
          "role": "operator",
          "sesion": {
            "email": "cvillacresp@est.ups.edu.ec",
            "pass": "1234"
          }
  
      }
  )
  console.log("usuario creada?")
};

crearUser();

const crearWaterEvent = () =>{
  WaterPump.create(
      {
        dateHour:{
          hour:"11:18",
          date:"17/07/2023"
      }
      }
  )
  console.log("evento waterpump creada?")
};

crearWaterEvent();
*/