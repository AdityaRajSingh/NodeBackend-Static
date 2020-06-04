const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const app= express();
const path = require('path');
const bodyParser=require('body-parser');
mongoose.connect('mongodb+srv://Aditya:<password>@cluster0-wa0s2.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true});


// To Parse Json
app.use(bodyParser.json());

//To attach data to req.body
app.use(bodyParser.urlencoded({extended:true}))


app.use(morgan('dev'));


// making public 
app.use(express.static("public"));

//app.get(endpoint,callback);


let count=0;
app.get('*',function(req,res,next)
{
    count++;
    next();
})

//routes
const orders=require('./routes/orders');
app.use('/orders',orders);

const users=require('./routes/users');
app.use('/users',users);

const pizzas=require('./routes/pizzas');
app.use('/pizzas',pizzas);




app.get('/',function(req,res)
{

    res.send("Home");
})

app.get('/newpage',function(req,res)
{ 
    res.sendFile(path.join(__dirname+'/public/index2.html'));
})


app.post('/formdata',function(req,res)
{
    console.log(req.body);
})


app.get('/count',function(req,res)
{
    res.send(count.toString()).status(204);
})

app.listen(8000,function()
{
    console.log("Our server has started on port 8000")
})