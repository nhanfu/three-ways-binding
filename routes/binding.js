html(document.body)
	.input(store.benhNhan.mayte).attr({placeholder: 'Mã y tế'}).change(store.txtmayte_changeHandler).$
	.input(store.benhNhan.ho).attr({placeholder: 'Họ'}).$
	.input(store.benhNhan.ten).attr({placeholder: 'Tên'}).$
	.input(store.benhNhan.gioitinh).attr({placeholder: 'Giới tính'}).$
	.input(store.benhNhan.ngaysinh).attr({placeholder: 'Ngày sinh'}).$
	.br
	.input(store.benhNhan.diachi).attr({placeholder: 'Địa chỉ'}).$
	.input(store.benhNhan.sodienthoai).attr({placeholder: 'Số điện thoại'}).$
	.input(store.benhNhan.nghenghiep).attr({placeholder: 'Nghề nghiệp'}).$
	.br
	.button.text('Thêm bệnh nhân').click(store.addBenhNhan);