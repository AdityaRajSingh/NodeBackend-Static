const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const app= express();
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



//routes
const orders=require('./routes/orders');
app.use('/orders',orders);







app.post('/formdata',function(req,res)
{
    console.log(req.body);
})



app.listen(8000,function()
{
    console.log("Our server has started on port 8000")
})