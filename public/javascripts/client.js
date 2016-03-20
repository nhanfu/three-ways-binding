html(function () {
	html.postJSON('/index').done(function (page) {
		app.store = eval(page);
	});
});

var app = {};
app.watch = function (prop, observer) {
	var serverWire = function () {
		html.postJSON('/watch', {data: data, prop: prop})
			.done(function (serverStore) {
				for (var s in serverStore) {
					app.store[s]._newData = serverStore[s];
				}
			});
	};
	// serverWire.
	observer.subscribe(serverWire, 'serverWire');
}