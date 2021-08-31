const express=require('express');

const app=express();

//Užregistruojame Body-parser middleware kuris sutvarko atsiųstus duomenis
app.use(express.urlencoded({extended:false}));

//Middleware taikomas visiems (loginame atėjusius vartotojus)
app.use((req, res, next)=>{
     console.log("Atejo naujas vartotojas:  "+req.url);
     next();
});
//Vartotojas atėjo į nuorodą /users (GET metodas)
app.get('/users',(req,res,next)=>{
   res.send("<form action='/add_user' method='POST'><input type='text' name='vardas'><br><input type='text' name='pavarde'><button type='submit'>Issiusti</button></form>");
});

//Vartotojas atėjo iš formos (POST metodas), jam atvaizduojame informaciją
app.post('/add_user',(req,res,next)=>{
    let vardas=req.body.vardas;
    let pavarde=req.body.pavarde;
    res.send("<h1>Pridėti vartotoją</h1>"+"Vartotojo vardas: "+req.body.vardas+"<br>Pavarde:"+req.body.pavarde);
});

//Jei vartotojas nusikopijavo nuorodą ir atėjo ne per formą(POST metodą), o įklijavęs nuorodą (GET metodą)
//Tuomet mes jį redirektiname į /users nuorodą (įvedo formą)
app.get('/add_user', (req, res, next)=>{
    res.redirect('/users');
});

//Jei vartotojas atėjo į pagrindinį puslapį / mes jam išvedame informaciją
app.get('/',(req,res,next)=>{
    res.send("<h1>Pagrindinis puslapis</h1>");
 });

app.listen(3000);
