const express=require('express');
const app= express();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

//app.get(endpoint,callback);


app.get('/',function(req,res)
{
    res.sendFile(__dirname+'/index.html')
})

app.get('/Aditya',function(req,res)
{
    res.send("Aditya's Page");
})


app.get('/Vent',function(req,res)
{
    res.send("Vent's Page");
})



app.post('/formdata',function(req,res)
{
    console.log(req.body);
})






app.listen(8000,function()
{
    console.log("Our server has started on port 8000")
})