html(document.body)
	.input(store.firstName).change(store.firstName.change).$
	.input(store.lastName).$
	.input(store.fullName).$
	.button.text('Login').click(store.login_click).$
	.br
	.dropdown(store.cities, store.selectedCity, 'text', 'val').change(store.city_change).$
	.dropdown(store.district, store.selectedDistrict, 'text', 'val').$