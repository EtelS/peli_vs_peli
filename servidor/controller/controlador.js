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

function peliculasRandom (req, res){
    let id= req.params.id;
    let sqlcompe= `select nombre from competencias where id= ${id};`
    con.query(sqlcompe, function(error, nombreCompetencia){
        if (error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("No se encontro la competencia");
        }else{
            competencia = nombreCompetencia;
             
        let sql= 'select id, poster, titulo from pelicula order by rand() limit 2;';
        con.query(sql, function(error, resultado){
            if (error){
                console.log(error(console.log("Hubo un error en la consulta", error.message)));
                return res.status(404).send("Hubo un error en la consulta");
            }else{
                resultados= {
                    'competencia':nombreCompetencia[0].nombre,
                    'peliculas':resultado
                }
            }
            res.send(resultados);   
        })
    }
    }
    )
}
function votar(req, res){
    let idCompetencia=req.params.id;
    let idPelicula= req.body.idPelicula;
    let sql= `insert into votos (id_pelicula, id_competencia) values (${idPelicula} , ${idCompetencia})`;
    con.query(sql, function(error, resultado){
        if (error){
            console.log("Hubo un error en la consulta", error);
            return res.status(500).send("No se pudo insertar el voto");
        }else {
            res.send(resultado);
        }
    })
}

function mostrarVotadas(req, res){
    let id_competencia=req.params.id;
    let sqlcompe= `select nombre from competencias where id= ${id_competencia};`
    con.query(sqlcompe, function(error, nombreCompetencia){
        if (error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("No se encontro la competencia");
        }else{
            competencia = nombreCompetencia;
        let sql= `select p.id, p.poster, p.titulo, count(p.id) as votos from pelicula p 
            inner join votos v on p.id=v.id_pelicula
            inner join competencias c on c.id=v.id_competencia
            where c.id= ${id_competencia}
            group by v.id_pelicula
            order by count(p.id) desc limit 3;`

            con.query(sql, function(error, resultado){
                if(error){
                    console.log("Hubo un error en la consulta", error);
                    return res.status(500).send("No se pudo procesar la informacion");
                }else{
                    response={
                        'competencia':nombreCompetencia[0].nombre,
                        'resultados':resultado
                    }
                }
        res.send(response);
            })

        } })}

function enviarGeneros(req, res){
    let sql='select * from genero';

    con.query(sql, function(error, resultado){
        if (error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(resultado));
    });
}
function enviarActores(req, res){
    let sql='select * from actor';

    con.query(sql, function(error, resultado){
        if (error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(resultado));
    });
}
function enviarDirectores(req, res){
    let sql='select * from director';

    con.query(sql, function(error, resultado){
        if (error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(resultado));
    });
}
function agregarCompetencia(req, res){
    let nueva_competencia= req.body;
    let nombre_competencia= nueva_competencia.nombre;
    let genero_id= nueva_competencia.genero;
    let director_id= nueva_competencia.director;
    let actor_id= nueva_competencia.actor;

    let sql_compara= `select * from competencias where nombre like '%${nombre_competencia}' `
    console.log('sql compara: ', sql_compara);

    con.query(sql_compara, function(error, resultado){
            console.log('resultado.length: ', resultado.length);
        if (resultado.length > 0 ){
                return res.status(422).send("Ya existe esa competencia!!");}
                else{
                    let sql= `insert into competencias (nombre, genero_id, director_id, actor_id) values ('${nombre_competencia}', ${genero_id}, ${director_id}, ${actor_id})`

                    con.query(sql, function(error, resultado){
                        console.log('sql en agregar competencia: ', sql);
                        if (error){
                            console.log("Hubo un error en la consulta", error.message);
                            return res.status(404).send("Hubo un error en la consulta");
                        }
                        res.send(JSON.stringify(resultado));

                    });
                    };
            
                });
        }
function eliminarVotos(req, res){
    let competencia_id= req.params.id;
    let sql_compara=`select * from votos where id_competencia=${competencia_id}`;
    con.query(sql_compara, function(error, resultado){
        if (resultado.length==0){
            console.log('No hay votos para esta competencia');
            return res.status(422).send("no existen votos para esta competencia");
        }else{
            let sql= `delete from votos where id_competencia= ${competencia_id}`;

            console.log('sql delete: ', sql);

            con.query(sql, function(error, resultado){
                if(error){
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(404).send("Hubo un error en la consulta");
                }
                return res.send(JSON.stringify(resultado));
            })
        }
        })

}

module.exports= {
    listarCompetencias,
    obtenerCompetencia,
    peliculasRandom,
    votar,
    mostrarVotadas,
    enviarGeneros,
    enviarActores,
    enviarDirectores,
    agregarCompetencia,
    eliminarVotos
}