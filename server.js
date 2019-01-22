const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('./authentication/keys');
const models = require('./models/models');
const router = require('./routing/route');

let connections = [];


mongoose.connect(keys.database, () => {
    console.log('connected to mongo db')
})

app.use(router.getPages); // use the external router file 
// use body parser to help catching data inbetween clients and server 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// use a static resources
app.use(express.static(path.join(__dirname, 'home')));
// setup a view engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'home'))

let port = process.env.PORT || 2000;

server.listen(port, () => {
    console.log(`To launch this app take this link http://127.0.0.1:${port}/ in the browser`)
})


// global vars
app.use(function(req, res, next){
    res.locals.postIdUrl = null;
    next();
})

// server sockets broadcaster
io.sockets.on('connection', function(socket){

    // pushing the active client into array of the connecting peoples
    connections.push(socket);
    
    // testing the sockets length for pushing it onto the array
    console.log(`Connected:There %s sockets connected`, connections.length);

    //disconnected
    socket.on('disconnect', function(data){
        
        // removing the clients who are disconnected from the array
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    })

    // getting id param and load the data on the blog post
    app.get('/blog/post_number=:id', (req, res) => {
        global.postIdUrl = req.params.id;

        models.post.findOne({_id: postIdUrl}, function(err, data){
            if(err) return console.error(err);

            // console.log(data.postTitle)
            res.render('post', {
                postTitle: data.postTitle,
                postPic: data.postPic,
                postDate: data.postDate,
                postEditor: data.postEditor,
                postTopic: data.postTopic,
                postSubTitle: data.postSubTitle,
                subTitleTopic: data.subTitleTopic
            });


        });

    })

    // getting id param and load the data on the blog post
    app.get('/nubia/products/product_number=:id', (req, res) => {
        global.shopIdUrl = req.params.id;

        models.nubiaProd.findOne({_id: shopIdUrl}, function(err, data){
            if(err) return console.error(err);

            // console.log(data.postTitle)
            res.render('shop', {
                prodName: data.prodName,
                prodPic: data.prodPic,
                prodPrice: data.prodPrice,
                prodDesc: data.prodDesc
            });


        });

    })
    


    // getting post data from script house dashboard
    socket.on('update post from dashboard', (data) => {
        new models.post({
            postTitle: data.postTitle,
            postDate: data.postDate,
            postEditor: data.postEditor,
            postTopic: data.postTopic,
            postSubTitle: data.postSubTitle,
            subTitleTopic: data.subTitleTopic
        
        }).save().then((newPost) => {
            
            // send the post from dashboard to clients without refreshing the page
            io.sockets.emit('get the new post', newPost);
            console.log(newPost)
        });
    });

    // send the uploaded post to clients after a while
    models.post.find(function(err, post){
        if(err) return console.error(err);
        
        // fetch all posts and send it to the client
        post.forEach(function(p){
            socket.emit('send new post', {
                postId: p.id,
                postTitle: p.postTitle,
                postPic: p.postPic,
                postDate: p.postDate,
                postEditor: p.postEditor,
                postTopic: p.postTopic,
                postSubTitle: p.postSubTitle,
                subTitleTopic: p.subTitleTopic
                
            })
        })
    })

    // get sub post to views on recent posts on the side
    models.post.find(function(err, post){
        if(err) return console.error(err);

        post.forEach(function(p){
            socket.emit('recent post', {
                postId: p.id,
                postTitle: p.postTitle,
                postPic: p.postPic,
                postDate: p.postDate
            })
        })

    }).limit(6);


    // get sub post to views on home page and blog section
    models.post.find(function(err, post){
        if(err) return console.error(err);

        post.forEach(function(p){
            socket.emit('home page posts', {
                postId: p.id,
                postTitle: p.postTitle,
                postPic: p.postPic,
                postDate: p.postDate,
                postEditor: p.postEditor,
                postSubTitle: p.postSubTitle
            })
        })
    }).limit(3)


    // comments system on the uploaded posts pages
    socket.on('post comment', function(data){

        new models.comment({
            postHeader: data.postHeader,
            commentName: data.commentName,
            commentMsg: data.commentMsg,
            commentEmail: data.commentEmail,
            commentDate: data.commentDate
        }).save().then((postComment) => {
            // update comments immediately when done
            models.comment.findOne({postHeader: postComment.postHeader}, function(err, post){
                if(err) return console.error(err);
                console.log(post)
                io.sockets.emit('new message comment', post);

            })

        })

        

    });


    models.comment.find(function(err, comment){
        if(err) return console.error(err);

        socket.emit('send comments length', comment)
        

        // update comments after reloading
        comment.forEach(function(c){
            socket.emit('get post comment', {
                postHeader: c.postHeader,
                commentName: c.commentName,
                commentMsg: c.commentMsg,
                commentEmail: c.commentEmail,
                commentDate: c.commentDate
            })
        })
    
    })

    // getting product info from dashboard
    socket.on('get nubia product from dashboard', function(data){
        new models.nubiaProd({
            prodName: data.productName,
            prodPic: data.productPic,
            prodPrice: data.productPrice,
            prodDesc: data.productDesc
        }).save().then((product) => {
            console.log(product)
        })

    })

    // find product data and send it to clients
    models.nubiaProd.find(function(err, prod){
        if(err) return console.error(err);
        prod.forEach(function(p){
            socket.emit('update client product', {
                prodId: p.id,
                prodName: p.prodName,
                prodPic: p.prodPic,
                prodPrice: p.prodPrice,
                prodDesc: p.prodDesc
            })
        })
    }).limit(4)

    models.nubiaProd.find(function(err, prod){
        if(err) return console.error(err);
        prod.forEach(function(p){
            socket.emit('fetch all product', {
                prodId: p.id,
                prodName: p.prodName,
                prodPic: p.prodPic,
                prodPrice: p.prodPrice,
                prodDesc: p.prodDesc
            })
        })
    })


})
