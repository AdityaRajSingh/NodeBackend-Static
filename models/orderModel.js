const mongoose=require('mongoose');
const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    client: 
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    pizza:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Pizza',
        required:true
    },
    count:
    {
        type:Number,
        default: 1
    },
    totalPrice:{
        type:Number,
        default: 0
    },
    time:{
        type:Date,
        default: Date.now(),
    }
});

module.exports=mongoose.model('Order',orderSchema);