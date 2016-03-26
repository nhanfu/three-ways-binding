var html = require('../public/javascripts/html.engine');
var mongoose = require('mongoose');
var User = require('../domains/Users');

var Store = function () {
	var self = this;
	self.benhNhan = html.data(function () {
		return {
			mayte: '16000001',
			ho: 'Nguyễn', ten: 'Tạ Ân Nhân',
			gioitinh: 'Nam',
			ngaysinh: new Date,
			diachi: '42/1 Tô Ký, phường Tân Chánh Hiệp, quận 12, Tp.HCM',
			sodienthoai: '0978532695',
			nghenghiep: 'Developer'
		};
	});

	self.mayte = html.data(function () {
		self.benhNhan().mayte;
	});
	self.ho = html.data(function () {
		self.benhNhan().ho;
	});
	self.ten = html.data(function () {
		self.benhNhan().ten;
	});
	self.gioitinh = html.data(function () {
		self.benhNhan().gioitinh;
	});
	self.ngaysinh = html.data(function () {
		self.benhNhan().ngaysinh;
	});
	self.diachi = html.data(function () {
		self.benhNhan().diachi;
	});
	self.sodienthoai = html.data(function () {
		self.benhNhan().sodienthoai;
	});
	self.nghenghiep = html.data(function () {
		self.benhNhan().nghenghiep;
	});

	self.mayte.subscribe(function (mayte) {
		// User.findByMayte(mayte, function (err, user) {
		// 	self.benhNhan(user);
		// });
	})
};

module.exports = Store;