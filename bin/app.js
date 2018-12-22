const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./router/route')
const nubiaRouter = require('./router/nubia-route')
const nubiaClients = require('./db/nubia-client')

console.log()

// invoke express minimalistic liberary
const app = express()

// use external router module
app.use(router)
app.use('/nubia', nubiaRouter)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//setup a static resources
app.use(express.static(path.join(__dirname, 'home')))

//setup a view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'home'))

const port = process.env.PORT || 3000;
//listen on the port in order to run the app in the browser
app.listen(port, () => {
	console.log(`You can type in the browser http://127.0.0.1:${port} to run the application!`)
})

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Script House Technical Team & IT Support',
		client1: nubiaClients.clientInfo_1,
		client2: nubiaClients.clientInfo_2,
		client3: nubiaClients.clientInfo_3
	})
})



























//
