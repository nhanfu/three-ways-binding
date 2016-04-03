var users = [{code: '01', firstName: 'Nguyễn', lastName: 'Tạ Ân Nhân', gender: 'Nam', dateOfBirth: new Date(1990, 0, 16), address: '42/1 Tô Ký, Tân Chánh Hiệp, quận 12', phone: '0978532695', occupation: 'Lập trình'},
{code: '02', firstName: 'Nguyễn', lastName: 'Thị Lan Anh', gender: 'Nữ', dateOfBirth: new Date(1990, 10, 14), address: '42/1 Tô Ký, Tân Chánh Hiệp, quận 12', phone: '0979149140', occupation: 'HCNS'}]

var UserModel = {
	findByCode: function (code, callback) {
		var person = users.find(function (x) { return x.code === code});
	    callback(null, person);
	},
	addUser: function (user, callback) {
		users.push(user);
		callback(null);
	},
	getList: function (callback) {
		callback(users);
	}
}

module.exports = UserModel;