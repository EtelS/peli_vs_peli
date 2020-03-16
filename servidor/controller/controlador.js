const chalk = require('chalk');
const success= chalk.bold.green;
const error= chalk.bold.red;

var con= require('../conexion.js');

function listarCompetencias(req, res){
    let sql= 'select nombre from competencias'
    con.query(sql, function(error, resultado, fields){
        if (error){
            console.log(error(console.log("Hubo un error en la consulta", error.message)));
            return res.status(404).send("Hubo un error en la consulta");
        }
        let response= {
            'competencias': resultado
        };
        res.send(response);
    });
}

module.exports= {
    listarCompetencias
}