var express = require('express');
var router = express.Router();
var Store = require('./Store');
var store = new Store();
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
	  var storeStr = ' var store = {\n';
	  for (var prop in clientStore) {
	  	storeStr += prop + getPropValue(clientStore, prop);
	  }
	  storeStr.length--; // remove the last semicolon in the string
	  storeStr += '}\nfor (var prop in store) {'
	  + '\n  app.serverWire(prop, store[prop]);\n}\n'
	  res.json(storeStr + data + ' ;store;');
	});
});

function getPropValue (store, prop) {
	return html.isFunction(store[prop]) ? (': app.serverEvent(\'' + prop + '\'),\n')
		: (': html.data(' + JSON.stringify(store[prop]) + '),\n');
}

router.post('/serverWire', function(req, res, next) {
	var body = req.body;
	store[body.prop](body.data);
	return newState(req, res, next);
});

router.post('/serverEvent', function(req, res, next) {
	var body = req.body;
	var event = store[body.eventName];
	// execute the event
	event();
	return newState(req, res, next);
});

function newState(req, res, next) {
	var result = {};
	for (var prop in store) {
		if (store[prop].computed || store[prop].isDirty && store[prop].isDirty())
			result[prop] = store[prop]();
		store[prop].isDirty && store[prop].isDirty(false);
	}
  	res.json(result);
}

module.exports = router;
