html(document.body)
	.input(store.mayte).attr({placeholder: 'Mã y tế'}).change(store.txtmayte_changeHandler).$
	.input(store.ho).attr({placeholder: 'Họ'}).$
	.input(store.ten).attr({placeholder: 'Tên'}).$
	.input(store.gioitinh).attr({placeholder: 'Giới tính'}).$
	.input(store.ngaysinh).attr({placeholder: 'Ngày sinh'}).$
	.br
	.input(store.diachi).attr({placeholder: 'Địa chỉ'}).$
	.input(store.sodienthoai).attr({placeholder: 'Số điện thoại'}).$
	.input(store.nghenghiep).attr({placeholder: 'Nghề nghiệp'}).$
	.br
	.button.text('Thêm bệnh nhân').click(store.addBenhNhan)
