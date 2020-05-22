const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const userModel=require('../models/userModel');

router.get('/',function(req,res)
{
    userModel.find()
    .exec()
    .then(users=>{
        res.json(users).status(200);
    })
})

router.post('/',function(req,res)
{
    const newUser= new userModel({
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,    
        email: req.body.email,
    });
    newUser.save()
    .then(data=>{res.json(data).status(201);})
    .catch(err=>{res.json(err).status(500);})
})


router.get('/:userID',function(req,res)
{
    
    const id=req.params.userID;
    userModel.find({_id:id})
    .exec()
    .then(user=>
        {
            res.json(user).status(200);
        })
})

router.put('/:userID',function(req,res)
{
    const id=req.params.userID;
    const newEmail=req.body.email;
    
    userModel.updateOne({_id:id},{$set:{email:newEmail}})
    .exec()
    .then(user=>{
        res.json(user).status(200);
    })
})


router.delete('/:userID',function(req,res)
{
    const id=req.params.userID;
    userModel.deleteOne({_id:id})
    .exec()
    .then(object=>
        {
            res.json(object).status(200);
        })
})

module.exports=router;