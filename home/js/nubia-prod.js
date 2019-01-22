let homeSocket = io.connect('http://127.0.0.1:2000');


let appendProdOnHome = $('#handle-products');
let appendProdAll = $('#handle-all-prod');

homeSocket.on('update client product', (data) => {
  
    appendProdOnHome.append(`<div class="col-12 col-sm-6 col-lg-3">\
    <div class="single-product-area mb-50 wow fadeInUp" data-wow-delay="300ms">\
    <div class="product-img"><img src="${data.prodPic}" alt=""></a>\
    <div class="product-meta d-flex"><a href="#" class="wishlist-btn">\
    <i class="icon_heart_alt"></i></a>\
    <a href="#" class="add-to-cart-btn">Add to cart</a>\
    <a href="#" class="compare-btn" onclick="alert('hello world')"><i class="arrow_left-right_alt"></i></a></div>\
    </div><div class="product-info mt-15 text-center">\
    <a href="http://127.0.0.1:2000/nubia/products/product_number=${data.prodId}"><p>${data.prodName}</p>\</a>
    <h6>$${data.prodPrice}</h6></div></div></div>`)

})

homeSocket.on('fetch all product', (data) => {
  
    appendProdAll.append(`<div class="col-12 col-sm-6 col-lg-4"><div class="single-product-area mb-50">
    <div class="product-img"><img src="${data.prodPic}" alt=""></a>
    <div class="product-meta d-flex"><a href="#" class="wishlist-btn"><i class="icon_heart_alt">
    </i></a><a href="http://127.0.0.1:2000/cart/" class="add-to-cart-btn">Add to cart</a>
    <a href="#" class="compare-btn"><i class="arrow_left-right_alt"></i></a></div></div>
    <div class="product-info mt-15 text-center">
    <a href="http://127.0.0.1:2000/nubia/products/product_number=${data.prodId}">
    <p>${data.prodName}</p></a><h6>$${data.prodPrice}</h6></div></div></div>`)

})




