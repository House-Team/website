let app = require('express').Router()

let subTitle = 'Nubia Design | Script House Technical Team'
// a get route for nubia page
app.get('/', (req, res) => {
	res.render('nubia', {
		title: `${subTitle}`
	})
})

// a get route for nubia page
app.get('/team', (req, res) => {
	res.render('nubia-team', {
		title: `About Team | ${subTitle}`
	})
})


// rendering nubia shop page
app.get('/shop', (req, res) => {
	res.render('nubia-shop', {
		title: `Shop | ${subTitle}`
	})
})

// rendering nubia shop page
app.get('/cart', (req, res) => {
	res.render('cart', {
		title: `Cart | ${subTitle}`
	})
})

// rendering nubia shop page
app.get('/checkout', (req, res) => {
	res.render('checkout', {
		title: `Checkout | ${subTitle}`
	})
})

module.exports = app
