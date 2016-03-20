var express = require('express');
var router = express.Router();
var store = require('./Store');
var html = require('../public/javascripts/html.engine');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
	var body = req.body;

  	res.render('index', { title: 'Express' });
});

/* GET rendering script from server. */
router.post('/index', function(req, res, next) {
	fs.readFile(require.resolve('./binding.js'), 'utf8', function (err, data) {
	  if (err) {
	    return console.log(err);
	  }
	  var clientStore = html.serialize(store);
	  var storeStr = 'var store = {';
	  for (var i in clientStore) {
	  	storeStr += i + ':html.data(\'' + clientStore[i].data + '\').delay(200),';
	  }
	  storeStr.length--; // remove the last semicolon in the string
	  storeStr += '}\nfor (var prop in store) {'
	  + '\n  app.watch(prop, store[prop]);'
	  +	'\n}';
	  res.json(storeStr + data + ' ;store;');
	});
});

router.post('/watch', function(req, res, next) {
	var body = req.body;
	store[body.prop].data(body.data);
	var result = {};
	for (var prop in store) {
		if (store[prop].data.computed)
			result[prop] = store[prop].data();
	}
  	res.json(result);
});

module.exports = router;
