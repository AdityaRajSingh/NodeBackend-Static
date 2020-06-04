const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const userModel=require('../models/userModel');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const auth=require('../auth')

const saltRounds=10;

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
        password: bcryptjs.hashSync(req.body.password,saltRounds)
    });
    newUser.save()
    .then(data=>{res.json(data).status(201);})
    .catch(err=>{res.json(err).status(500);})
})

router.post('/login',function(req,res){
    userModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user==null)
        {
            res.send("Sorry The User Doesnt Exist. Kindly SignUp first").status(401);
        }
        else{
           if(bcryptjs.compareSync(req.body.password,user.password))
           {
            const token=jwt.sign(
                {
                    email:user.email,
                    _id:user._id
                },
                'lenovo',
                {
                    expiresIn: '1h'
                }
            );

            res.json(
                {
                    "message":"Auth Successful",
                    "token":token
                }
            ).status(200);
           }
           else{
            res.send("Sorry,Auth Failed").status(401);
           }
        }
    })
});

router.get('/:userID',auth,function(req,res)
{
    
    const id=req.params.userID;
    userModel.find({_id:id})
    .exec()
    .then(user=>
        {
            res.json(user).status(200);
        })
})

router.put('/:userID',auth,function(req,res)
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