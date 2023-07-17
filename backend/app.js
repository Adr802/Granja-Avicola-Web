
const express=require('express');
const app=express();
const {mongoose} = require('./config/database')

//const morgan=require('morgan');
//const cors = require('cors');

//settings
app.set('nombreApp', 'Aplicacion para la gestion de una granja Avicola'); 
app.set('puerto',process.env.PORT|| 3000);

app.use(express.json());

//middleware
//app.use(morgan('dev')); 
//app.use(cors({origin: 'http://localhost:4200'}));

//routes
app.use('/api',require('./routes/users'));
app.use('/api',require('./routes/data'));
app.use('/api',require('./routes/waterPump'));


app.listen(app.get('puerto'), ()=>{

    console.log('Nombre de la App',app.get('nombreApp')); 
console.log('http://localhost:', app.get('puerto'));
})