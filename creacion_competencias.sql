use competencias;

create table competencias(
id INT NOT NULL AUTO_INCREMENT,
nombre varchar (100),
primary key (id));


insert into competencias (nombre) values
 ('Cuál es la mejor pelicula?'), 
('Qué drama te hizo llorar mas?'),
('Cuál es la peli más bizarra?'),
('Quién es el peor actor?');

alter table competencias add column genero_id int(11) unsigned, add foreign key (genero_id) references genero(id);
alter table competencias add column director_id int(11) unsigned, add foreign key (director_id) references director(id);
alter table competencias add column actor_id int(11) unsigned, add foreign key (actor_id) references actor(id);

