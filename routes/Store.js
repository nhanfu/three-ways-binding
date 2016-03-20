var html = require('../public/javascripts/html.engine');

var store = {
	firstName: {
		data: html.data('Nguyen Ta An')
	},
	lastName: {
		data: html.data('Nhan')
	}
};
store.fullName = {
	data: html.data(function () {
		return store.firstName.data() + ' ' + store.lastName.data();
	})
};

module.exports = store;