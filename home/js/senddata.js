// import { models } from "mongoose";

let socket = io.connect('http://127.0.0.1:2000');

let blogPostData = function(){

    let appendPostOnBlog = $('.append-post-on-blog');
    let appendPostOnResent = $('.append-post-on-resent');
    let appendPostOnHomePage = $('.append-post-on-home-page');


    socket.on('send new post', (data) => {

    	appendPostOnBlog.append(`<div class="col-12 col-lg-6"><div class="single-blog-post mb-50">\
								<div class="post-thumbnail mb-30"><a href="/blog/post_number=${data.postId}">\
								<img src="http://127.0.0.1:2000/img/bg-img/2.jpg" alt=""></a></div><div class="post-content">\
								<a href="/blog/post_number=${data.postId}" class="post-title"><h5>${data.postTitle}</h5></a>\
								<div class="post-meta"><a href="#"><i class="fa fa-clock-o" aria-hidden="true">\
								</i>${data.postDate}</a><a href="#"><i class="fa fa-user" aria-hidden="true">\
								</i> ${data.postEditor}</a></div><p class="post-excerpt">${data.postSubTitle}\
								</p></div></div></div>`)

    })
    
    socket.on('recent post', (data) => {

    	appendPostOnResent.append(`<div class="single-latest-post d-flex align-items-center">\
				<div class="post-thumb"><img src="http://127.0.0.1:2000/img/bg-img/1.jpg" alt="">\
				</div><div class="post-content"><a href="/blog/post_number=${data.postId}" class="post-title">\
				<h6>${data.postTitle}</h6></a>\
				<a href="/blog/post_number=${data.postId}" class="post-date">${data.postDate}</a></div></div>`)
    })


    socket.on('home page posts', (data) => {
    	

    	appendPostOnHomePage.append(`<div class="col-12 col-md-6 col-lg-4"><div class="single-blog-post mb-100">\
									<div class="post-thumbnail mb-30"><a href="/blog/post_number=${data.postId}">\
									<img src="http://127.0.0.1:2000/img/bg-img/offer-1.jpg" alt=""></a></div><div class="post-content">\
									<a href="/blog/post_number=${data.postId}" class="post-title"><h5>${data.postTitle}</h5></a>\
									<div class="post-meta"><a href="#">\
									<i class="fa fa-clock-o" aria-hidden="true"></i>${data.postDate}</a>
									<a href="#"><i class="fa fa-user" aria-hidden="true"></i>${data.postEditor}\
									</a></div><p class="post-excerpt">${data.postSubTitle}</p></div></div></div>`)

    })


    // comments system
    
  //   let today = new Date(),
  //   	hour = today.getHours(),
  //   	min = today.getMinutes(),
	 //    day = today.getDate(),
	 //    month = today.getMonth()+1, //January is 0!
		// year = today.getFullYear();

   
	


}();





