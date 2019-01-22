const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.render('index')
})


router.get('/home', (req, res, next) => {
    res.render('index')
})


router.get('/about', (req, res, next) => {
    res.render('about')
})

router.get('/contact', (req, res, next) => {
    res.render('contact')
})


router.get('/portfolio', (req, res, next) => {
    res.render('portfolio')
})

router.get('/cart', (req, res, next) => {
    res.render('cart')
})


router.get('/portfolio/project', (req, res, next) => {
    res.render('single-portfolio')
})

router.get('/blog', (req, res, next) => {
    res.render('blog')
})


// router.get('/blog/post', (req, res, next) => {
//     res.render('post')
// })


router.get('/nubia', (req, res, next) => {
    res.render('nubia-team')
})

router.get('/nubia/products', (req, res, next) => {
    res.render('nubia')
})

// router.get('/nubia/products/shop', (req, res, next) => {
//     res.render('shop')
// })

router.get('/checkout', (req, res, next) => {
    res.render('checkout')
})




module.exports.getPages = router;