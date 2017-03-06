var express = require('express');
var mongojs = require('mongojs');

var db = mongojs('mytaskslistdb', ['tasks']);

var router = express.Router();
//get ALL tasks
router.get('/tasks', function (req, res, next) {
	db.tasks.find( function (err, tasks){
		if(err){
			res.send(err);			
		}
		res.json(tasks);
	});
});

//get ONE tasks
router.get('/tasks/:id', function (req, res, next) {
	db.tasks.findOne({ _id : mongojs.ObjectId(req.params.id) }, function (err, task){
		if(err){
			res.send(err);			
		}
		res.json(task);
	});
});

//Save tasks
router.post('/tasks', function (req, res, next) {
	var task = req.body;
	
	if( !task.title ){
		res.status(400);
		res.json({
			"error":" Bad Data"
		});	
	}else{
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);			
			}
			res.json(task);			
		});
	}
});

//Delete a tasks
router.delete('/tasks/:id', function (req, res, next) {

	db.tasks.remove({ _id : mongojs.ObjectId(req.params.id) }, function (err, task){
		if(err){
			res.send(err);			
		}
		res.json(task);
	});
});

//Update a tasks
router.put('/task/:id', function (req, res, next) {

	var task = req.body;
	var updTask = {};

	if(task.title){
		updTask.title = task.title;
	}
	if(task.isDone){
		updTask.isDone = task.isDone;
	}
	console.log(updTask.title + " " + updTask.isDone);
	if( !updTask ){
		res.status(400);
		res.json({
			"error":" Bad Data"
		});
	}else{
		db.tasks.update({ _id : mongojs.ObjectId(req.params.id) }, updTask, {} , function (err, task){
			if(err){
				res.send(err);			
			}
			res.json(task);
		});
	}

});

module.exports = router;