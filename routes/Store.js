var html = require('../public/javascripts/html.engine');

var Store = function () {
	var self = this;
	var district = [{val: 1, text: 'Quận 1', city: 'HCM'},
		{val: 2, text: 'Quận 2', city: 'HCM'},
		{val: 3, text: 'Quận 3', city: 'HCM'},
		{val: 4, text: 'Quận 4', city: 'HCM'},
		{val: 5, text: 'Quận 5', city: 'HCM'},
		{val: 6, text: 'Quận 6', city: 'HCM'},
		{val: 7, text: 'Quận 7', city: 'HCM'},
		{val: 8, text: 'Quận 8', city: 'HCM'},
		{val: 9, text: 'Quận 9', city: 'HCM'},
		{val: 10, text: 'Ba Đình', city: 'HN'},
		{val: 11, text: 'Đông Anh', city: 'HN'},
		{val: 12, text: 'Hồ Tây', city: 'HN'},
		{val: 13, text: 'Thanh Xuân', city: 'HN'},
		{val: 14, text: 'Đống Đa', city: 'HN'}];

	self.login_click = function () {
		self.firstName('haha');
		self.lastName('I did it');
	};
	self.city_change = function () {
		self.selectedDistrict(self.district()[0]);
	};
	self.firstName = html.data('Nguyen Ta An')
				  .required('First name is required!');
	self.lastName = html.data('Nhan');
	self.fullName = html.data(function () {
		return self.firstName() + ' ' + self.lastName();
	});
	self.cities = html.data([{val: 'HCM', text: 'Hồ Chí Minh'}, {val: 'HN', text: 'Hà Nội'}]);
	self.selectedCity = html.data(self.cities()[0]);
	self.district = html.data(function () {
		var city = self.selectedCity();
		return district.filter(function (d) {
			return d.city === city.val;
		});
	});
	self.selectedDistrict = html.data(function () {
		return self.district()[0];
	});
};

module.exports = Store;