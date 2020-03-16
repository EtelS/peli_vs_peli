var express= require('express');
var bodyParser= require('body-parser');
var buscadorController= require('./controller/controlador');
var app= express();

const http= require('http');
const chalk = require('chalk');
const success= chalk.bold.green;
const error= chalk.bold.red;

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.get('/competencias', buscadorController.listarCompetencias );

const host= '0.0.0.0'
const port= '8080';

app.listen(port, function(){
    console.log(success(`Servidor activo en http://${host}:${port}`));
});