const mongoose = require('mongoose');
const {Schema} = mongoose;

const CommentSchema = new Schema({
    title:{
        type:String,
        requires:true
    },
    description:{
        type:String        
    },
    user:{
        type:{}
    },
    parend
    

    

},{timestamps:true})
const user = mongoose.model('Comment',CommentSchema);
user.createIndexes()
module.exports = user