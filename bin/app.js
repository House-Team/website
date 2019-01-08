const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./router/route')
const nubiaRouter = require('./router/nubia-route')
const nubiaClients = require('./db/nubia-client')
const expressValidator = require('express-validator')

console.log()

// invoke express minimalistic liberary
const app = express()

// use external router module
app.use(router)
app.use('/nubia', nubiaRouter)

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// add an express validator middleware
app.use(expressValidator({
	errorFormatter: (param, msg, value) => {
		let namespace = param.split('.'),
			root = namespace.shift(),
			formParam = root;
		
		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}

		return{
			param: formParam,
			msg: msg,
			value: value
		}
	}
}))

//setup a static resources
app.use(express.static(path.join(__dirname, 'home')))

// global variables
app.use(function(req, res, next){
	res.locals.errors = null
	next()
})

//setup a view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'home'))

const port = process.env.PORT || 3000;
//listen on the port in order to run the app in the browser
app.listen(port, () => {
	console.log(`You can type in the browser http://127.0.0.1:${port} to run the application!`)
})

let callBackRoute = {
	title: 'Script House Technical Team & IT Support',
	client1: nubiaClients.clientInfo_1,
	client2: nubiaClients.clientInfo_2,
	client3: nubiaClients.clientInfo_3
}

// route for the home page
app.get('/', (req, res) => {
	res.render('index', callBackRoute)
})



//post requests from the home pages 
app.post('/contact', (req, res) => {

	req.checkBody('name_input', 'The name value should be enterd').notEmpty()
	req.checkBody('email_input', 'The email value should be enterd').notEmpty()
	req.checkBody('subject_input', 'The subject value should be enterd').notEmpty()
	req.checkBody('message', 'The message value should be enterd').notEmpty()

	let errors = req.validationErrors()
 
	if(errors){
		res.redirect('contact')
	}else{
		let newContact = {
			name: req.body.name_input,
			email: req.body.email_input,
			subject: req.body.subject_input,
			message: req.body.message
		}
		res.render('index', callBackRoute)
		console.log(newContact)
	}

	
})



//
