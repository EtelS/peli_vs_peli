var express= require('express');
var bodyParser= require('body-parser');
var cors= require('cors');
var buscadorController= require('./controller/controlador');
var app= express();

const http= require('http');
const chalk = require('chalk');
const success= chalk.bold.green;
const error= chalk.bold.red;

app.use(cors());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());


app.get('/competencias', buscadorController.listarCompetencias );
app.get('/competencias/:id', buscadorController.obtenerCompetencia);
app.get('/competencias/:id/peliculas', buscadorController.peliculasRandom);
app.post('/competencias/:id/voto', buscadorController.votar);
app.get('/competencias/:id/resultados', buscadorController.mostrarVotadas);
app.get('/generos', buscadorController.enviarGeneros);
app.get('/actores', buscadorController.enviarActores);
app.get('/directores', buscadorController.enviarDirectores);
app.post('/competencias', buscadorController.agregarCompetencia);
app.delete('/competencias/:id/votos', buscadorController.eliminarVotos);



const host= '0.0.0.0'
const port= '8080';

app.listen(port, function(){
    console.log(success(`Servidor activo en ${port}`));
});