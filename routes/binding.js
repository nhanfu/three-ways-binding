html(document.body)
	.input(store.user.code).attr({placeholder: 'Code'}).change(store.txtCode_changeHandler).$
	.input(store.user.firstName).attr({placeholder: 'First Name'}).$
	.input(store.user.lastName).attr({placeholder: 'Last Name'}).$
	.input(store.user.gender).attr({placeholder: 'Gender'}).$
	.input(store.user.dateOfBirth).attr({placeholder: 'Date of birth'}).$
	.br
	.input(store.user.address).attr({placeholder: 'Address'}).$
	.input(store.user.phone).attr({placeholder: 'Phone number'}).$
	.input(store.user.occupation).attr({placeholder: 'Occupation'}).$
	.br
	.button.text('Add person').click(store.adduser).$;

html.div.table.each(store.userList, function (user, rowIndex) {
	html.tr.each(store.userHeaders, function (header, colIndex) {
		html.td.text(user[header.field]);
	});
});