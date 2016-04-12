var users = [{code: '01', firstName: 'Nguyễn', lastName: 'Tạ Ân Nhân', gender: 1, dateOfBirth: new Date(1990, 0, 16), address: '42/1 Tô Ký, Tân Chánh Hiệp, quận 12', phone: '0978532695', occupation: 'Lập trình'},
{code: '02', firstName: 'Nguyễn', lastName: 'Thị Lan Anh', gender: 2, dateOfBirth: new Date(1990, 10, 14), address: '42/1 Tô Ký, Tân Chánh Hiệp, quận 12', phone: '0979149140', occupation: 'HCNS'}]

var UserModel = {
	findByCode: function (code, callback) {
		var person = users.find(function (x) { return x.code === code});
	    callback(null, person);
	},
	addUser: function (user, callback) {
		users.push(user);
		callback(null);
	},
	deleteUser: function (user, callback) {
		var index = users.indexOf(users.find(function (i) { return i.code == user.code; }));
		users.splice(index, 1);
		callback(null);
	},
	updateUser: function (user, callback) {
		var index = users.indexOf(users.find(function (i) { return i.code == user.code; }));
		users[index] = user;
		callback(null);
	},
	getList: function (callback) {
		callback(users);
	}
}

module.exports = UserModel;