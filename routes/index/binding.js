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
	.button.text(store.buttonText).click(store.addUpdateUser).$;


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