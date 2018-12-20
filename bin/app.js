let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let router = require('./router/route')
let nubiaRouter = require('./router/nubia-route')

// invoke express minimalistic liberary
let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// use external router module
app.use(router)
app.use('/nubia', nubiaRouter)

//setup a static resources
app.use(express.static(path.join('home')))

//setup a view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'home'))

var port = process.env.PORT || 3000;
//listen on the port in order to run the app in the browser
app.listen(port, function(){
	console.log(`server starts at port ${port}`)
})

app.get('/', function(req, res){
	res.render('index', {
		title: 'Script House Technical Team & IT Support'
	})
})































//
