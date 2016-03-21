html(document.body)
	.input(store.firstName).change(store.firstName.change).$
	.input(store.lastName).$
	.input(store.fullName).$
	.button.text(store.login).click(store.login.click).$