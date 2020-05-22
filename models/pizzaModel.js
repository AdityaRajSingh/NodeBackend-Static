const mongoose=require('mongoose');
const pizzaSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    pizzaName: 
    {
        type:String,
        required:true
    },
    burstType:
    {
        type:String,
    },
    price:
    {
        type:Number,
        required:true,
    },
});

module.exports=mongoose.model('Pizza',pizzaSchema);