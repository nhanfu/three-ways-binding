html(function () {
	html.postJSON('/index').done(function (page) {
		app.store = eval(page);
	});
});

html.config.lazyInput = true;

var app = {};

app.updateClientState = function (serverStore) {
	var node;
	for (var proppertyChanged in serverStore) {
		node = app.store[proppertyChanged];
		node._newData = serverStore[proppertyChanged];
		var targets = node.targets.forEach(function (target) {
			if (target.group !== 'serverWire') {
				target.call(target, node._newData, node._oldData, null, 'render');
			}
		});
	}
};

app.serverWire = function (prop, observer) {
	if (!observer || !observer.subscribe) return;
	var serverWire = function (data) {
		html.postJSON('/serverWire', {data: data, prop: prop})
		.done(app.updateClientState);
	};
	serverWire.group = 'serverWire';
	observer.subscribe(serverWire);
};

app.serverEvent = function (eventName) {
	return function (e) {
		html.postJSON('/serverEvent', {eventName: eventName})
		.done(app.updateClientState);
	};
};