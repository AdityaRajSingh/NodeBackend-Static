const mongoose=require('mongoose');
const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    clientName: 
    {
        type:String,
    },
    orderName:
    {
        type:String,

    },
    amount:
    {
        type:Number
    }
});

module.exports=mongoose.model('Order',orderSchema);