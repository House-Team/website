// create var that take express router value and invoke routing
let router = require('express').Router()
const nubiaClients = require('../db/nubia-client')


let subTitle = 'Script House Technical Team';
// Home router
router.get('/home', (req, res) => {
	res.render('index',{
		title: `${subTitle} & IT Support`,
		client1: nubiaClients.clientInfo_1,
		client2: nubiaClients.clientInfo_2,
		client3: nubiaClients.clientInfo_3

	})
})


// a get route for about page
router.get('/about', (req, res) => {
	res.render('about',{
		title: `About | ${subTitle}`
	})
})

// rendering portfolio page
router.get('/portfolio', (req, res) => {
	res.render('portfolio',{
		title: `Portfolio | ${subTitle}`
	})
})


// rendering portfolio page
router.get('/single-portfolio', (req, res) => {
	res.render('single-portfolio',{
		title: `${subTitle} | Single Portfolio`
	})
})

// rendering conternt page
router.get('/contact', (req, res) => {
	res.render('contact', {
		title: `${subTitle} | Contact`
	})
})

// rendering single-post page
router.get('/single-post', (req, res) => {
	res.render('single-post', {
		title: `${subTitle} | Blog | Single Post`
	})
})

// rendering blog page
router.get('/blog', (req, res) => {
	res.render('blog', {
		title: `${subTitle} | Blog`
	})
})

// exports router module for outside uses
module.exports  = router;
