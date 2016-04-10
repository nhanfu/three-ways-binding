app.serverWire(store.user.code, 'store.user.code');
app.serverWire(store.txtCode_change, 'store.txtCode_change');
app.serverWire(store.btnCancel_click, 'store.btnCancel_click');
app.serverWire(store.user.firstName, 'store.user.firstName');
app.serverWire(store.user.lastName, 'store.user.lastName');
app.serverWire(store.user.gender, 'store.user.gender');
app.serverWire(store.user.dateOfBirth, 'store.user.dateOfBirth');
app.serverWire(store.user.address, 'store.user.address');
app.serverWire(store.user.phone, 'store.user.phone');
app.serverWire(store.user.occupation, 'store.user.occupation');
app.serverWire(store.buttonText, 'store.buttonText');
app.serverWire(store.addUpdateUser, 'store.addUpdateUser');
app.serverWire(store.userList, 'store.userList');
app.serverWire(store.userHeaders, 'store.userHeaders');
app.serverWire(store.userIndex, 'store.userIndex');
app.serverWire(store.enable.button, 'store.enable.button');
app.serverWire(store.enable.code, 'store.enable.code');
app.focus(store.focus, 'store.focus');
app.validate(store.invalid, 'store.invalid');



html(document.body)
	.input(store.user.code).change(store.txtCode_change).enable(store.enable.code)
		.attr({placeholder: 'Code', name: 'user.code'}).$
	.input(store.user.firstName).attr({placeholder: 'First Name', name: 'user.firstName'}).$
	.input(store.user.lastName).attr({placeholder: 'Last Name', name: 'user.lastName'}).$
	.input(store.user.gender).attr({placeholder: 'Gender', name: 'user.gender'}).$
	.input(store.user.dateOfBirth).attr({placeholder: 'Date of birth', name: 'user.dateOfBirth'}).$
	.br
	.input(store.user.address).attr({placeholder: 'Address', name: 'user.address'}).$
	.input(store.user.phone).attr({placeholder: 'Phone number', name: 'user.phone'}).$
	.input(store.user.occupation).attr({placeholder: 'Occupation', name: 'user.occupation'}).$
	.br.br
	.button.text(store.buttonText).click(store.addUpdateUser).enable(store.enable.button).$
	.button.attr('type', 'cancel').text('Cancel').click(store.btnCancel_click).enable(store.enable.button).$.br.br;


html.div.table.each(store.userList, function (user, rowIndex) {
	html.tr.each(store.userHeaders, function (header, colIndex) {
		html.td.text(user[header.field]);
		if (header.className) html.className(header.className);
		if (header.action) html.click(function () {
			html.postJSON('/serverListEvent',
					{
						rowIndex  : rowIndex,
						action    : header.action,
						eventName : 'userListClick',
						newState  : html.serialize(store)
					})
				.done(app.updateClientState);
		});
	});
	html.click(function (e) {
		var src = e.srcElement || e.target;
		if (src.nodeName.toLowerCase() === 'button') return;
		if (store.userIndex() == rowIndex) return;
		store.userIndex(rowIndex);
		html.postJSON('/serverListEvent',
			{
				rowIndex  : rowIndex,
				action    : '',
				eventName : 'userListClick',
				newState  : html.serialize(store)
			})
		.done(app.updateClientState);
	})
});