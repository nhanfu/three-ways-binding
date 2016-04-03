var express = require('express');
var router = express.Router();
var Store = require('./Store');
var store = new Store();
var html = require('../public/javascripts/html.engine');
var fs = require('fs');
var util = require('../browserUtils/util');
var cookie = require('cookie');

/* GET home page. */
router.get('/', function(req, res, next) {
	var body = req.body;

  	res.render('index', { title: 'Express' });
});

/* GET rendering script from server. */
router.post('/index', function(req, res, next) {
	fs.readFile(require.resolve('./binding.js'), 'utf8', function (err, binding) {
	  if (err) {
	    return console.log(err);
	  }
	  var storeStr = JSON.stringify(store);
	  storeStr = storeStr.replace(/\}$/, '');
	  for (var prop in store) {
	  	if (html.isFunction(store[prop])) {
	  		storeStr += ', ' + prop + ': function () {}';
	  	}
	  }
	  storeStr = ' var store = ' + storeStr + '\n};app.store = store;\n';
	  var serverWire = '';
	  binding.replace(/\((store(\.\w*)*)\)/g, function ($0, $1) {
	  	serverWire += 'app.serverWire(' + $1 + ', \'' + $1 + '\');\n';
	  });
	  res.json(storeStr + serverWire + binding + ' ;\nstore;');
	});
});

router.post('/serverEvent', function(req, res, next) {
	var body = req.body,
		newState = body.newState;
	// set the new State for the store
	setState(store, newState);
	// get the event of the store
	var event = eval('store.' + body.eventName);
	// execute the event
	// a callback will be executed after all change has been done
	event(function (store) {
		res.json(store);
	});
});

function setState(node, newState) {
	var value;
	for (var prop in newState) {
		value = newState[prop];
		if (!html.isFunction(value) && !html.isPropertiesEnumerable(value)) {
			node[prop] = value;
		} else if (html.isPropertiesEnumerable(value)) {
			setState(node[prop], value);
		}
	}
}

module.exports = router;
