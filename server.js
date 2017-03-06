var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();




//Para renderizar html
app.set( 'views', path.join(__dirname, 'views') );
app.set( 'views engine', 'ejs' );
app.engine('html', require('ejs').renderFile);

//Para los models de angular
app.use(express.static(path.join(__dirname,'models')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Definir rutas y sus controladores
var index = require('./controlers/index');
app.use('/', index);

var eventos = require('./controlers/tareas');
app.use('/api', eventos);

//Levantar el Servidor
var port = 3000;
app.listen(port, function(){
	console.log('Servidor escuchando en ' + port);
});