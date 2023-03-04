const mongoose = require('mongoose');
const {Schema} = mongoose;

const CartSchema = new Schema({
    
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"                
            },            
            quantity:{type:Number}
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        requires:true
    }
    
},{timestamps:true})
const cart = mongoose.model('cart',CartSchema);
cart.createIndexes()

module.exports = cart