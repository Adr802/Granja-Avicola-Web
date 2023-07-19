
const express=require('express');
const {mongoose} = require('./config/database')
const morgan=require('morgan');

//requiere para obtener DATOS DEL ESP32
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

//variable fecha
const fechaHoraActual = new Date();


//importanto modelos pruebas
const Data = require('./models/data')
const User = require('./models/user')
const WaterPump = require('./models/waterPump')

//const cors = require('cors');

//settings

const app=express();


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


//funcion para obtener los datos y enviar a la base de datos

// Obtener el año, el mes y el día
const year = fechaHoraActual.getFullYear();
const month = fechaHoraActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0 (enero) hasta 11 (diciembre)
const day = fechaHoraActual.getDate();

// Obtener las horas, minutos y segundos
const hours = fechaHoraActual.getHours();
const minutes = fechaHoraActual.getMinutes();
const seconds = fechaHoraActual.getSeconds();

function requestHandler(request, response) {
  var uriData = url.parse(request.url);
  var pathname = uriData.pathname;
  var query = uriData.query;
  var queryData = querystring.parse(query);

  if (pathname === '/update') {
    var newData = {
      temp: queryData.temp,
      hum: queryData.humd,
      waterLevel: 15,
      dateHour:{
        hour : `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        date : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }
      
    };
    //base de datos
    console.log(newData);

    Data.create(newData);
    response.end();
  }
}

app.get('/update', requestHandler);
const server = http.createServer(app);

server.listen(app.get('puerto'), ()=>{

    console.log(app.get('nombreApp')); 
    console.log('http://localhost:3000');
})
/*
const crearData = () =>{
    console.log("Data creada?")
}

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