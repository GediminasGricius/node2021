const express=require('express');

const app=express();

app.use(express.urlencoded({extended:false}));

app.use((req, res, next)=>{
     console.log("Atejo naujas vartotojas:  "+req.url);
    
     next();
});

app.get('/users',(req,res,next)=>{
   res.send("<form action='/add_user' method='POST'><input type='text' name='vardas'><br><input type='text' name='pavarde'><button type='submit'>Issiusti</button></form>");
});

app.post('/add_user',(req,res,next)=>{
    let vardas=req.body.vardas;
    let pavarde=req.body.pavarde;
    res.send("<h1>Pridėti vartotoją</h1>"+"Vartotojo vardas: "+req.body.vardas+"<br>Pavarde:"+req.body.pavarde);
});



app.use('/',(req,res,next)=>{
    res.send("<h1>Pagrindinis puslapis</h1>");
 });



app.listen(3000);
