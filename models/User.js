var users = [{mayte: '01', ho: 'Nguyễn', ten: 'Tạ Ân Nhân', gioitinh: 'Nam', ngaysinh: new Date(1990, 0, 16), diachi: '42/1 Tô Ký, Tân Chánh Hiệp, quận 12', sodienthoai: '0978532695', nghenghiep: 'Lập trình'},
{mayte: '02', ho: 'Nguyễn', ten: 'Thị Lan Anh', gioitinh: 'Nữ', ngaysinh: new Date(1990, 10, 14), diachi: '42/1 Tô Ký, Tân Chánh Hiệp, quận 12', sodienthoai: '0979149140', nghenghiep: 'HCNS'}]

var UserModel = {
	findByMayte: function (mayte, callback) {
		var person = users.find(function (x) { return x.mayte === mayte});
	    callback(null, person);
	},
	addBenhNhan: function (benhNhan, callback) {
		users.push(benhNhan);
		callback(null);
	}
}

module.exports = UserModel;