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
	  var variables = '';
	  for (var i in clientStore) {
        var observer = 'var ';
	  	observer += i + ' = html.data(\'' + clientStore[i].data + '\');';
	  	observer += i + '.events = ' + getEventList(clientStore[i]) + '\n';
	  	variables += observer;
	  }
	  var storeStr = variables + ' var store = {';
	  for (var i in clientStore) {
	  	storeStr += i + ': ' + i + ',';
	  }
	  storeStr.length--; // remove the last semicolon in the string
	  storeStr += '}\nfor (var prop in store) {'
	  + '\n  app.serverWire(prop, store[prop]);'
	  + '\n  app.registerEvents(prop, store[prop]);\n}'
	  res.json(storeStr + data + ' ;store;');
	});
});

var notEvent = ['data'];
function getEventList (prop) {
	var res = [];
	for (var eventName in prop) {
		if (notEvent.indexOf(eventName) >= 0) continue;
		res.push(eventName);
	}
	return JSON.stringify(res);
};

router.post('/serverWire', function(req, res, next) {
	var body = req.body;
	store[body.prop].data(body.data);
	return newState(req, res, next);
});

router.post('/serverEvent', function(req, res, next) {
	var body = req.body;
	var event = store[body.prop][body.eventName];
	// execute the event
	event();
	return newState(req, res, next);
});

function newState(req, res, next) {
	var result = {};
	for (var prop in store) {
		if (store[prop].data.computed || store[prop].data.isDirty())
			result[prop] = store[prop].data();
		store[prop].data.isDirty(false);
	}
  	res.json(result);
}

module.exports = router;
