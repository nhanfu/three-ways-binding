var html = require('../../public/javascripts/html.engine');
var UserModel = require('../../models/User');
var util = require('../../browserUtils/util');

var Store = function () {
	var self = this;
	self.user = {
		code: '',
		firstName: '',
		lastName: '',
		gender: '',
		dateOfBirth: '',
		address: '',
		phone: '',
		occupation: ''
	};

	self.txtCode_changeHandler = function (done) {
		var code = self.user.code;
		UserModel.findByCode(code, function (err, user) {
			if (!err && user) {
				self.user.firstName = user.firstName;
				self.user.lastName = user.lastName;
				self.user.gender = user.gender;
				self.user.dateOfBirth = user.dateOfBirth;
				self.user.address = user.address;
				self.user.phone = user.phone;
				self.user.occupation = user.occupation;
			} else {
				self.user.firstName = '';
				self.user.lastName = '';
				self.user.gender = '';
				self.user.dateOfBirth = '';
				self.user.address = '';
				self.user.phone = '';
				self.user.occupation = '';
				util.notify = 'Patient not found, please input another patient ID!';
				util.focus = 'code';
			}
			done();
		});
	};

	self.userHeaders = [
		{caption: 'Code', field: 'code'},
		{caption: 'First name', field: 'firstName'},
		{caption: 'Last name', field: 'lastName'},
		{caption: 'Date of birth', field: 'dateOfBirth'},
		{caption: 'Address', field: 'address'},
		{caption: 'phone', field: 'phone'},
		{caption: 'Occupation', field: 'occupation'},
		{caption: '', action: 'delete', field: '', className: 'fa fa-trash' },
	];
	self.userList = [];
	self.userListEvent = function (rowIndex, action, done) {
		if (action === 'delete') {
			self.userList.splice(rowIndex, 1);
		}
		done();
	}
	self.init = function (done) {
		UserModel.getList(function (userList) {
			self.userList = userList;
			done();
		});
	}

	self.adduser = function (done) {
		var user = {
			code: self.user.code, firstName: self.user.firstName, lastName: self.user.lastName, gender: self.user.gender,
			address: self.user.address, dateOfBirth: self.user.dateOfBirth,
			phone: self.user.phone, occupation: self.user.occupation
		};

		UserModel.addUser(user, function (err) {
			if (!err) {
				self.user.code = '';
				self.user.firstName = '';
				self.user.lastName = '';
				self.user.gender = '';
				self.user.dateOfBirth = '';
				self.user.address = '';
				self.user.phone = '';
				self.user.occupation = '';
			}
			done();
		});
	};
};

module.exports = Store;