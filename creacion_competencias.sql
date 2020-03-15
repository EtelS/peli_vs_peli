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