var html = require('../public/javascripts/html.engine');

var store = {
	firstName: {
		data: html.data('Nguyen Ta An'),
		change: function () {
			// nothing to do here, just get the value of fullName and send to client
		}
	},
	lastName: {
		data: html.data('Nhan')
	},
	login: {
		data: html.data('Login'),
		click: function () {
			store.firstName.data('haha');
			store.lastName.data('I did it');
		}
	}
};
store.fullName = {
	data: html.data(function () {
		return store.firstName.data() + ' ' + store.lastName.data();
	})
};

module.exports = store;