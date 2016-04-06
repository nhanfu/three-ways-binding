var html = require('../../public/javascripts/html.engine');
var UserModel = require('../../models/User');
var util = require('../../browserUtils/util');

var Store = function () {
	var self = this;
	self.user = {
		code: html.data(''),
		firstName: html.data(''),
		lastName: html.data(''),
		gender: html.data(''),
		dateOfBirth: html.data(''),
		address: html.data(''),
		phone: html.data(''),
		occupation: html.data('')
	};

	self.buttonText = 'Add person';

	self.txtCode_changeHandler = function (done) {
		var code = self.user.code();
		UserModel.findByCode(code, function (err, user) {
			if (!err && user) {
				self.user.firstName(user.firstName);
				self.user.lastName(user.lastName);
				self.user.gender(user.gender);
				self.user.dateOfBirth(user.dateOfBirth);
				self.user.address(user.address);
				self.user.phone(user.phone);
				self.user.occupation(user.occupation);
				var userInList = self.userList().find(function (user) {
					return user.code === self.user.code;
				});
				self.userIndex = self.userList().indexOf(userInList);
				self.buttonText = 'Update';
			} else {
				self.user.firstName('');
				self.user.lastName('');
				self.user.gender('');
				self.user.dateOfBirth('');
				self.user.address('');
				self.user.phone('');
				self.user.occupation('');
				util.notify = 'Patient not found, please input another patient ID!';
				util.focus = 'code';
				self.buttonText = 'Add person';
				self.userIndex = -1;
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
	self.userIndex = -1;
	self.userList = html.data([]);
	self.userListClick = function (rowIndex, action, done) {
		if (action === 'delete') {
			UserModel.deleteUser(self.userList()[rowIndex], function (err) {
				self.userList().splice(rowIndex, 1);
				done();
			});
		} else if (action === '') {
			html.setState(self.user, self.userList()[rowIndex]);
			self.userIndex = rowIndex;
			self.buttonText = 'Update';
			done();
		}
	};

	self.init = function (done) {
		UserModel.getList(function (userList) {
			self.userList(userList);
			done();
		});
	};

	self.addUpdateUser = function (done) {
		var user = {
				code: self.user.code(), firstName: self.user.firstName(), lastName: self.user.lastName(), gender: self.user.gender(),
				address: self.user.address(), dateOfBirth: self.user.dateOfBirth(),
				phone: self.user.phone(), occupation: self.user.occupation()
			};

		if (self.userIndex === -1) { // add person
			UserModel.addUser(user, function (err) {
				self.userList.add(user);
				self.user.code('');
				resetUser();
				self.userIndex = -1;
				done();
			});
		} else { // update person
			UserModel.updateUser(user, function (err, person) {
				self.userList()[self.userIndex] = user;
				self.buttonText = 'Add person';
				self.user.code('');
				resetUser();
				self.userIndex = -1;
				done();
			});
		}
	};
	function resetUser() {
		self.user.firstName('');
		self.user.lastName('');
		self.user.gender('');
		self.user.dateOfBirth('');
		self.user.address('');
		self.user.phone('');
		self.user.occupation('');
	}
};

module.exports = Store;