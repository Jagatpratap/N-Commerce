const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({

    role:{
        type:String,
        enum:["Admin","Customer","Editor","Author","ShopManager"],
        default:"Customer"
    },

    name:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        requires:true,
        unique:true
    },
    password:{
        type:String        
    },    
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }],
    // cart:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"cart"
    // }
},{timestamps:true})
const user = mongoose.model('user',UserSchema);
user.createIndexes()
module.exports = user