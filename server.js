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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Definir rutas y sus controladores
var index = require('./controlers/index');
app.use('/', index);

var eventos = require('./controlers/random');
app.use('/api', eventos);

//Levantar el Servidor
var port = parseInt(process.argv[2]);
global.componente = process.argv[3];
app.listen(port, function(){
	console.log('Servidor escuchando en ' + port +" "+ componente);
});