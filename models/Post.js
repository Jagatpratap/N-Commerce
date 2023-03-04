const mongoose = require('mongoose');
const {Schema} = mongoose;

const PostSchema = new Schema({    
    title:{
        type:String,
        requires:true
    },
    slug:{
        type:String,
        requires:true,
        unique:true
    },
    excerpt:{
        type:String,
    },
    description:{
        type:String
    },
    featuredImage:{
        type:String
    },
    image:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        requires:true
    }
    

},{timestamps:true})
const post = mongoose.model('post',PostSchema);
post.createIndexes()
module.exports = post