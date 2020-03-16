const chalk = require('chalk');
const success= chalk.bold.green;
const error= chalk.bold.red;

var con= require('../conexion.js');

function listarCompetencias(req, res){
    let sql= 'select * from competencias'
    con.query(sql, function(error, resultado){
        if (error){
            console.log(error(console.log("Hubo un error en la consulta", error.message)));
            return res.status(404).send("Hubo un error en la consulta");
        }
        
        res.send(JSON.stringify(resultado));
    });
}
function obtenerCompetencia(req, res){
    let id= req.params.id;
    let sql= 'select * from competencias where id= '+id;
    con.query(sql, function(error, resultado){
        if (error){
            console.log(error(console.log("Hubo un error en la consulta", error.message)));
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(resultado));
    });

}

module.exports= {
    listarCompetencias,
    obtenerCompetencia
}