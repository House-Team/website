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

app.use(express.static(path.join('home')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'home'))

app.listen(3000, function(){
	console.log('server starts at port 3000')
})

app.get('/', function(req, res){
	res.render('index', {
		title: 'Script House Technical Team & IT Support'
	})
})































//
