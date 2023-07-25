
const express=require('express');
const {mongoose} = require('./config/database')
const morgan=require('morgan');
const cors = require('cors');

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
const app=express();
const server = http.createServer(app);

const io = require('socket.io')(server,{
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST","PUT","DELETE"]
  }
  });

//settings




app.set('nombreApp', 'Aplicacion para la gestion de una granja Avicola'); 
app.set('puerto',process.env.PORT|| 3000);

app.use(cors());

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


function requestHandler(request, response) {
  var uriData = url.parse(request.url);
  var pathname = uriData.pathname;
  var query = uriData.query;
  var queryData = querystring.parse(query);

  if (pathname === '/update') {
    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date();
    const year = fechaHoraActual.getFullYear();
    const month = fechaHoraActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0 (enero) hasta 11 (diciembre)
    const day = fechaHoraActual.getDate();
    const hours = fechaHoraActual.getHours();
    const minutes = fechaHoraActual.getMinutes();
    const seconds = fechaHoraActual.getSeconds();

    var newData = {
      temp: queryData.temp,
      hum: queryData.humd,
      waterLevel: 15,
      dateHour: {
        hour: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      }
    };
    
    //base de datos
    console.log(newData);
    io.emit("hello from server", newData);
    Data.create(newData);
    response.end();
  }
}

io.on('connection', function(socket){
  console.log('alguien se ha conectado con sockets');
   // send a message to the client
   socket.emit("hello from server", "primera hola");

   // receive a message from the client
   socket.on("hello from client", (data) => {
     console.log("estoy recibiendo en el server: " + data)
})
});
app.get('/update', requestHandler);

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
        hour:"11:18",
        date:"17/07/2023"
      }
  )
  console.log("evento waterpump creada?")
};

crearWaterEvent();
*/