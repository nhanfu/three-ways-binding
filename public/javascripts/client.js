html(function () {
	html.postJSON('/index').done(function (page) {
		eval(page);
	});
});

html.config.lazyInput = true;

var app = {};
app.isPropertiesEnumerable = function (x) {
    return typeof x === 'object' && html.isNotNull(x) && !html.isDate(x);
};

app.updateClientState = function (data, rootNode) {
	var node = rootNode || html.getData(app.store), value, observer;
	if (html.isArray(data)) {
		node.subscribe && node(data);
		return;
	}
	for (var prop in data) {
		observer = node[prop];
		value = data[prop];
		if (observer && observer.subscribe && !app.isPropertiesEnumerable(value)) {
			// if the node is observer, and the new value is not an object
			// update the node value and notify change to the UI
			app.updateUI(observer, value);
		} else if (app.isPropertiesEnumerable(value)) {
			// register server event
			app.updateClientState(value, html.isArray(value) ? observer : html.getData(observer));
		}
	}
};

app.updateUI = function (node, newData) {
	node._newData = newData;
	node.refresh();
}

app.serverWire = function (value, prop) {
	if (!prop) return;
	if (!html.isFunction(value)) {
		value = eval('app.' + prop + '=html.data(' + JSON.stringify(value) + ');\n'); // create observer
	} else {
		eventName = prop.replace('store.', '');
		app.store[eventName] = app.serverEvent(eventName);
	}
};

app.serverEvent = function (eventName) {
	return function (e) {
		html.postJSON('/serverEvent', {eventName: eventName, newState: html.serialize(app.store)})
			.done(app.updateClientState);
	};
};

app.focus = function (value, prop) {
	app.serverWire(value, prop);
	var observer = eval('app.' + prop);
	observer.subscribe(function (val) {
		if (val === '') return;
		html('[name="' + val +'"]').focus();
		observer('');
	});
};

app.validate = function (value, prop) {
	app.serverWire(value, prop);
	var observer = eval('app.' + prop);
	observer.subscribe(function (message) {
		if (message === '') return;
		toastr.warning(message);
		observer('');
	});
};

// app.validate = function (value, prop) {
// 	app.serverWire(value, prop);
// 	var observer = eval('app.' + prop);
// 	observer.subscribe(function (obj) {
// 		if (obj == null) return;
// 		toastr.warning(obj.message);
// 		html('[name="' + obj.control +'"]').;
// 		observer({});
// 	});
// };