const express=require('express');

const app=express();

app.use((req, res, next)=>{
     console.log("Atejo naujas vartotojas:");
     console.log(req.socket.remoteAddress);
     console.log(req.url);
     next();
});

app.get('/users',(req,res,next)=>{
   res.send("<h1>Vartotojų sąrašas</h1>");
});

app.get('/add_user',(req,res,next)=>{
    res.send("<h1>Pridėti vartotoją</h1>");
});

app.use('/',(req,res,next)=>{
    res.send("<h1>Pagrindinis puslapis</h1>");
 });



app.listen(3000);
