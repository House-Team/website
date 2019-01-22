let postTitle = $('#title');
let appendPostComments = $('.append-post-comments');
let commentName = $('#comment-name');
let commentEmail = $('#comment-email');
let commentMsg = $('#comment-msg');
let commentBtn = $('#comment-btn');
let commentsCount = $('.comments-count');


let postHeader = postTitle.context.URL.split('=')[1];
    


let autoRun = function(){

    commentBtn.on('click', function(){
    	
    	if(commentName.val() === ''){
    		alert('Please fill in all fields')
    	}else{
    		socket.emit('post comment', {
				postHeader: postHeader,
    			commentName: commentName.val(),
    			commentMsg: commentMsg.val(),
    			commentEmail: commentMsg.val(),
    			commentDate: Date(),
    		})
    	}

    	$(function(){
    		commentName.val('')
    		commentEmail.val('')
    		commentMsg.val('')
    	})();
    	

    })


    socket.on('new message comment', (data) => {
        // console.log(data.length)
        
        if(data.postHeader === postHeader){

            appendPostComments.append(`<li class="single_comment_area"><div class="comment-wrapper d-flex">\
								  <div class="comment-author"><span>${data.commentName[0]}<span></div><div class="comment-content">\
								  <div class="d-flex align-items-center justify-content-between">\
								  <h5>${data.commentName}</h5><span class="comment-date">\
								  ${data.commentDate.split(':')[0].split('-')[2].split('T')[0]}/${data.commentDate.split('-')[1]}/${data.commentDate.split('-')[0]}\
								  </span>\
								  </div><p>${data.commentMsg}</p><a class="active" href="#">\
								  Reply</a></div></div></li>`)

        }else{
            return false;
        }

    	
    	})
        
        
    socket.on('get post comment', (data) => {

        if(data.postHeader === postHeader){

    	    appendPostComments.append(`<li class="single_comment_area"><div class="comment-wrapper d-flex">\
		    						  <div class="comment-author"><span>${data.commentName[0]}<span></div><div class="comment-content">\
		    						  <div class="d-flex align-items-center justify-content-between">\
		    						  <h5>${data.commentName}</h5><span class="comment-date">\
		        						  ${data.commentDate.split(':')[0].split('-')[2].split('T')[0]}/${data.commentDate.split('-')[1]}/${data.commentDate.split('-')[0]} \
		    						  </span>\
		    						  </div><p>${data.commentMsg}</p><a class="active" href="#">\
		    						  Reply</a></div></div></li>`)
   
            
   	 		
        }else{
            return false;
        }
    })


    socket.on('send comments length', function(data){
        console.log(data.length)
        if(data.length > 0){
            commentsCount.append('Comment Here')
        }else{
            commentsCount.append('Be The First One Who Comment!')
        }
    })
        

    

}();