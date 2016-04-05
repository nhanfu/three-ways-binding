var express = require('express');
var html = require('../../public/javascripts/html.engine');
var router = express.Router();

var cities = html.data([{name: 'HCM', value: 1}, {name: 'Tokyo hot', value: 2}]);
var selectedCity = html.data(cities()[0]);
var users = html.data([{name: 'Nhan', age: 26, city: 1}, {name: 'Hung baby', age: 23, city: 1}, {name: 'Hao cute', age: 24, city: 1}]);
var usersWithCity = html.data(function() {
	return users().filter(function (user) {
		user.city === selectedCity().value;
	});
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(cities());
});

module.exports = router;
