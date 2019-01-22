const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This model is made for blog posters
let postSchema = new Schema({
    postTitle: String,
    postPic: String,
    postDate: String,
    postEditor: String,
    postTopic: String,
    postSubTitle: String,
    subTitleTopic: String
});


// this model is made for script house users
let scriptorSchema = new Schema({
	scriptorName: String,
	scriptorPic: String,
	scriptorDescription: String,
	scriptorField: String,
	scriptorMediaLinks: {
		facebook: String,
		twitter: String,
		googlePlus: String,
		linkedIn: String
	}
})

// this model is made for comments system
let commentSchema = new Schema({
	postHeader: String,
	commentName: String,
	commentMsg: String,
	commentEmail: String,
	commentDate: Date,
})

// nubia products schema 
let nubiaProduct = new Schema({
	prodName: String,
	prodPic: String,
	prodPrice: Number,
	prodDesc: String,
	prodLove: String
})

// create the schema on the database 
let Post = mongoose.model('post', postSchema);
let Scriptor = mongoose.model('scriptor', scriptorSchema);
let Comment = mongoose.model('comment', commentSchema);
let NubiaProduct = mongoose.model('nubiaProduct', nubiaProduct);


// exporting the models outside of the 
module.exports = {
	post: Post,
	scriptor: Scriptor,
	comment: Comment,
	nubiaProd: NubiaProduct
}





