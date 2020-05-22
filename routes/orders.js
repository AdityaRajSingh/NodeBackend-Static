const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const orderModel=require('../models/orderModel');
// 
router.get('/',function(req,res)
{
    orderModel.find()
    .exec()
    .then(orders=>{
        res.json(orders).status(200);
    })
})

router.post('/',function(req,res)
{
    const newOrder= new orderModel({
        _id:new mongoose.Types.ObjectId(),
        client: req.body.client,    
        pizza: req.body.pizza,
        count: req.body.count,
        totalPrice: req.body.totalPrice,
        time: req.body.time,
    });
    newOrder.save()
    .then(data=>{res.json(data).status(201);})
    .catch(err=>{res.json(err).status(500);})
})


router.get('/:orderID',function(req,res)
{
    
    const id=req.params.orderID;
    orderModel.find({_id:id})
    .exec()
    .then(order=>
        {
            res.json(order).status(200);
        })

})

router.put('/:orderID',function(req,res)
{
    const id=req.params.orderID;
    const newCount=req.body.count;
    
    orderModel.updateOne({_id:id},{$set:{count:newCount}})
    .exec()
    .then(order=>{
        res.json(order).status(200);
    })
})


router.delete('/:orderID',function(req,res)
{
    const id=req.params.orderID;
    orderModel.deleteOne({_id:id})
    .exec()
    .then(object=>
        {
            res.json(object).status(200);
        })
})

module.exports=router;