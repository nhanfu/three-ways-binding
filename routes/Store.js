var html = require('../public/javascripts/html.engine');
var UserModel = require('../models/User');
var util = require('../browserUtils/util');

var Store = function () {
	var self = this;
	self.benhNhan = {
		mayte: '',
		ho: '',
		ten: '',
		gioitinh: '',
		ngaysinh: '',
		diachi: '',
		sodienthoai: '',
		nghenghiep: ''
	};

	self.txtmayte_changeHandler = function (callback) {
		var mayte = self.benhNhan.mayte;
		UserModel.findByMayte(mayte, function (err, benhNhan) {
			if (!err && benhNhan) {
				self.benhNhan.ho = benhNhan.ho;
				self.benhNhan.ten = benhNhan.ten;
				self.benhNhan.gioitinh = benhNhan.gioitinh;
				self.benhNhan.ngaysinh = benhNhan.ngaysinh;
				self.benhNhan.diachi = benhNhan.diachi;
				self.benhNhan.sodienthoai = benhNhan.sodienthoai;
				self.benhNhan.nghenghiep = benhNhan.nghenghiep;
			} else {
				self.benhNhan.ho = '';
				self.benhNhan.ten = '';
				self.benhNhan.gioitinh = '';
				self.benhNhan.ngaysinh = '';
				self.benhNhan.diachi = '';
				self.benhNhan.sodienthoai = '';
				self.benhNhan.nghenghiep = '';
				util.notify = 'Patient not found, please input another patient ID!';
				util.focus = 'mayte';
			}
			callback(self);
		});
	};

	self.listBenhNhan = [];

	self.init = function (callback) {
		UserModel.listBenhNhan(function (listBenhNhan) {
			self.listBenhNhan = listBenhNhan;
			callback(self);
		});
	}

	self.addBenhNhan = function (callback) {
		var benhNhan = {
			mayte: self.benhNhan.mayte, ho: self.benhNhan.ho, ten: self.benhNhan.ten, gioitinh: self.benhNhan.gioitinh,
			diachi: self.benhNhan.diachi, ngaysinh: self.benhNhan.ngaysinh,
			sodienthoai: self.benhNhan.sodienthoai, nghenghiep: self.benhNhan.nghenghiep
		};

		UserModel.addBenhNhan(benhNhan, function (err) {
			if (!err) {
				self.benhNhan.mayte = '';
				self.benhNhan.ho = '';
				self.benhNhan.ten = '';
				self.benhNhan.gioitinh = '';
				self.benhNhan.ngaysinh = '';
				self.benhNhan.diachi = '';
				self.benhNhan.sodienthoai = '';
				self.benhNhan.nghenghiep = '';
			}
			callback(self);
		});
	};
};

module.exports = Store;