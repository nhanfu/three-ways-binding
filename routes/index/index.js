var html = require('../../public/javascripts/html.engine');
var express = require('express');
var router = express.Router();
var Store = require('./Store');
var store = new Store();
var fs = require('fs');
var util = require('../../browserUtils/util');
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
	  store.init && store.init(function() {
	  	render(req, res, store, binding);
	  });
	});
});

function render (req, res, store, binding) {
	store = html.serialize(store);
	var storeStr = JSON.stringify(store);
	storeStr = storeStr.replace(/\}$/, '');
	for (var prop in store) {
	 	if (html.isFunction(store[prop])) {
	  		storeStr += ', ' + prop + ': function () {}';
	  	}
	}
	storeStr = ' var store = ' + storeStr + '};\napp.store = store;\n';
	res.json(storeStr + binding + ' ;\nstore;');
}

router.post('/serverEvent', function(req, res, next) {
	var body = req.body,
		newState = body.newState;
	// set the new State for the store
	html.setState(store, newState);
	// get the event of the store
	var event = eval('store.' + body.eventName);
	// execute the event
	// a callback will be executed after all change has been done
	event(function () {
		// check dirty here to send to client what data changes
		res.json(html.serialize(store));
	});
});

router.post('/serverListEvent', function(req, res, next) {
	var body      = req.body,
		newState  = body.newState,
		rowIndex  = body.rowIndex,
		action    = body.action,
		eventName = body.eventName;
	// set the new State for the store
	html.setState(store, newState);
	// get the event of the store
	var event = eval('store.' + eventName);
	// execute the event
	// a callback will be executed after all change has been done
	event(rowIndex, action, function () {
		// check dirty here to send to client what data changes
		res.json(html.serialize(store));
	});
});

html.setState = function (node, newState) {
	var value;
	for (var prop in newState) {
		value = newState[prop], observer = node[prop];
		if (!html.isFunction(value) && !html.isPropertiesEnumerable(value)) {
			if (observer != null && observer.subscribe)
				// in case the node value is kind of observer
				observer(value);
			else
				// in case the node value is not kind of observer
				node[prop] = value;
		} else if (html.isPropertiesEnumerable(value)) {
			// if the data is kind of object / Array
			if (observer != null && observer.subscribe)
				observer(value);
			else
				html.setState(node[prop], value);
		}
	}
}

html.validate = function (model) {
	var Model = html.getData(model),
		propVal,
		isPropertiesEnumerable;
	for (var prop in Model) {
		propVal = Model[prop];
		// if the propperty value is not observer, do nothing
		// otherwise, trigger validation
		if (propVal == null || !propVal.validate) continue;
		propVal = html.getData(Model[prop]);
		isPropertiesEnumerable = html.isPropertiesEnumerable(propVal);
		if (!isPropertiesEnumerable) {
			if (!Model[prop].isValid()) {
				var firstInvalidRule = Model[prop].validationResults.find(function (r) {
					return r.isValid === false
				});
				return firstInvalidRule.message;
			} else
				return null;
		} else {
			return html.validate(Model[prop]);
		}
	}
	// finally return null, the Model is valid
	return null;
}

module.exports = router;
