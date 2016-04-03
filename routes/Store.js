var html = require('../public/javascripts/html.engine');
var UserModel = require('../models/User');

var Store = function () {
	var self = this;
	self.mayte = html.data('');
	self.ho = html.data('');
	self.ten = html.data('');
	self.gioitinh = html.data('');
	self.ngaysinh = html.data('');
	self.diachi = html.data('');
	self.sodienthoai = html.data('');
	self.nghenghiep = html.data('');

	self.txtmayte_changeHandler = function (callback) {
		var mayte = self.mayte();
		UserModel.findByMayte(mayte, function (err, benhNhan) {
			if (!err && benhNhan) {
				self.ho(benhNhan.ho);
				self.ten(benhNhan.ten);
				self.gioitinh(benhNhan.gioitinh);
				self.ngaysinh(benhNhan.ngaysinh);
				self.diachi(benhNhan.diachi);
				self.sodienthoai(benhNhan.sodienthoai);
				self.nghenghiep(benhNhan.nghenghiep);
			} else {
				self.ho('');
				self.ten('');
				self.gioitinh('');
				self.ngaysinh('');
				self.diachi('');
				self.sodienthoai('');
				self.nghenghiep('');
			}
			callback(self);
		});
	};

	self.addBenhNhan = function (callback) {
		var benhNhan = {
			mayte: self.mayte(), ho: self.ho(), ten: self.ten(), gioitinh: self.gioitinh(),
			diachi: self.diachi(), ngaysinh: new Date(),
			sodienthoai: self.sodienthoai(), nghenghiep: self.nghenghiep()
		};

		UserModel.addBenhNhan(benhNhan, function (err) {
			if (!err) {
				self.mayte('');
				self.ho('');
				self.ten('');
				self.gioitinh('');
				self.ngaysinh('');
				self.diachi('');
				self.sodienthoai('');
				self.nghenghiep('');
			}
			callback(self);
		});
	};
};

module.exports = Store;