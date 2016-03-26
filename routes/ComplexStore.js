var html = require('../public/javascripts/html.engine');
var Store = require('./Store');

var ComplexStore = function () {
	var self = this;
	var storeList = [];
	for (var i = 0; i < 10; i++) storeList.push(new Store());
	self.storeList = html.data(storeList);
};

module.exports = ComplexStore;