const mongoose = require('mongoose');
const {Schema} = mongoose;

const AttributesSchema = new Schema({
    
    type:{
        type:String,
        enum:["String","Color","Image"],
        default:"String"        
    },
    name:{
        type:String,
        requires:true
    },
    slug:{
        type:String,
        requires:true,
        unique:true
    },
    terms:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"terms"
        }
    ]
    
},{timestamps:true})
const attributes = mongoose.model('attribute',AttributesSchema);
attributes.createIndexes()

module.exports = attributes