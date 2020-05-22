const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const pizzaModel=require('../models/pizzaModel');

router.get('/',function(req,res)
{
    pizzaModel.find()
    .exec()
    .then(pizzas=>{
        res.json(pizzas).status(200);
    })
})

router.post('/',function(req,res)
{
    const newPizza= new pizzaModel({
        _id:new mongoose.Types.ObjectId(),
        pizzaName: req.body.pizzaName,    
        burstType: req.body.burstType,
        price: req.body.price,
    });
    newPizza.save()
    .then(data=>{res.json(data).status(201);})
    .catch(err=>{res.json(err).status(500);})
})


router.get('/:pizzaID',function(req,res)
{
    
    const id=req.params.pizzaID;
    pizzaModel.find({_id:id})
    .exec()
    .then(pizza=>
        {
            res.json(pizza).status(200);
        })
})

router.put('/:pizzaID',function(req,res)
{
    const id=req.params.pizzaID;
    const newPrice=req.body.price;
    
    pizzaModel.updateOne({_id:id},{$set:{price:newPrice}})
    .exec()
    .then(pizza=>{
        res.json(pizza).status(200);
    })
})


router.delete('/:pizzaID',function(req,res)
{
    const id=req.params.pizzaID;
    pizzaModel.deleteOne({_id:id})
    .exec()
    .then(object=>
        {
            res.json(object).status(200);
        })
})

module.exports=router;