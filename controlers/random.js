var express = require('express');




var router = express.Router();
//get ALL tasks


router.get('/rand/:date', function (req, res, next) {
	res.json({
			"name": componente,
			"date": req.params.date,
			"disp": Math.random().toFixed(2)
		});
});

router.get('/rand/:name/:date', function (req, res, next) {
	if(req.params.name!=componente){
		res.json({'error':'Nombre de componente incorrecto'});

	}else{
		res.json({
			"name": componente,
			"date": req.params.date,
			"disp": Math.random().toFixed(2)
		});
	}
	
});

module.exports = router;
