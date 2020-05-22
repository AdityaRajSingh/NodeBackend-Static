const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const orderModel=require('../models/orderModel');

router.get('/',function(req,res)
{
    res.send('Orders Page');
})


router.post('/',function(req,res)
{
    const newOrder= new orderModel({
        _id:new mongoose.Types.ObjectId(),
        clientName: req.body.clientName,    
        orderName: req.body.orderName,
        amount: req.body.amount
    });
    newOrder.save();
    res.json("Order Successfully Created").status(201);
})


module.exports=router;