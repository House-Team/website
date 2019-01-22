// module.exports.events = (ev, models) => {

//     // getting post data from script house dashboard
//     ev.on('update post from dashboard', (data) => {
//         new models.post({
//             postTitle: data.postTitle,
//             postDate: data.postDate,
//             postEditor: data.postEditor,
//             postTopic: data.postTopic,
//             postSubTitle: data.postSubTitle,
//             subTitleTopic: data.subTitleTopic
        
//         }).save().then((newPost) => {
            
//             // send the post from dashboard to clients without refreshing the page
//             io.sockets.emit('get the new post', newPost);
//             console.log(newPost)
//         });
//     });

//     // send the uploaded post to clients after a while
//     models.post.find(function(err, post){
//         if(err) return console.error(err);
        
//         // fetch all posts and send it to the client
//         post.forEach(function(p){
//             ev.emit('send new post', {
//                 postId: p.id,
//                 postTitle: p.postTitle,
//                 postPic: p.postPic,
//                 postDate: p.postDate,
//                 postEditor: p.postEditor,
//                 postTopic: p.postTopic,
//                 postSubTitle: p.postSubTitle,
//                 subTitleTopic: p.subTitleTopic
                
//             })
//         })
//     })

//     // get sub post to views on recent posts on the side
//     models.post.find(function(err, post){
//         if(err) return console.error(err);

//         post.forEach(function(p){
//             ev.emit('recent post', {
//                 postTitle: p.postTitle,
//                 postPic: p.postPic,
//                 postDate: p.postDate
//             })
//         })

//     }).limit(6);


//     // get sub post to views on home page and blog section
//     models.post.find(function(err, post){
//         if(err) return console.error(err);

//         post.forEach(function(p){
//             ev.emit('home page posts', {
//                 postId: p.id,
//                 postTitle: p.postTitle,
//                 postPic: p.postPic,
//                 postDate: p.postDate,
//                 postEditor: p.postEditor,
//                 postSubTitle: p.postSubTitle
//             })
//         })
//     }).limit(3)


//     // comments system on the uploaded posts pages
//     ev.on('post comment', function(data){

//         new models.comment({
//             postHeader: data.postHeader,
//             commentName: data.commentName,
//             commentMsg: data.commentMsg,
//             commentEmail: data.commentEmail,
//             commentDate: data.commentDate
//         }).save().then((postComment) => {
//             // update comments immediately when done
//             models.comment.findOne({postHeader: postComment.postHeader}, function(err, post){
//                 if(err) return console.error(err);
//                 console.log(post)
//                 io.sockets.emit('new message comment', post)

//             })

//             // if(postComment.postHeader === data.postHeader){
//             //     io.sockets.emit('new message comment', postComment)
//             // }else{
//             //     return false;
//             // }
            
//         })
    
//     });

//     models.comment.find(function(err, comment){
//         if(err) return console.error(err);

//         // console.log(comment.length)
        
//         // event to get the number of comments we have 
//         ev.emit('get comment length', comment.length);

//         // update comments after reloading
//         comment.forEach(function(c){
//             ev.emit('get post comment', {
//                 commentName: c.commentName,
//                 commentMsg: c.commentMsg,
//                 commentEmail: c.commentEmail,
//                 commentDate: c.commentDate
//             })
//         })
    
//     })


// }// the end of IIFE design pattern function
