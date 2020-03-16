var express= require('express');
var bodyParser= require('body-parser');
var buscadorController= require('./controller/controlador');
var app= express();
const chalk = require('chalk');

const success= chalk.bold.green;
const error= chalk.bold.red;

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

var port= 'http://0.0.0.0:8080';

app.listen(port, function(){
    console.log(success("escuchando en el puerto: ", port));
});