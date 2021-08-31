const express=require('express');
//Susikuriam router, objektą į kurį sudėsime susijusiu middlewares
const router=express.Router();

//Vartotojas atėjo į nuorodą /users (GET metodas)
router.get('/',(req,res,next)=>{
    res.send("<form action='/user/add' method='POST'><input type='text' name='vardas'><br><input type='text' name='pavarde'><button type='submit'>Issiusti</button></form>");
 });
 
 //Vartotojas atėjo iš formos (POST metodas), jam atvaizduojame informaciją
 router.post('/add',(req,res,next)=>{
     let vardas=req.body.vardas;
     let pavarde=req.body.pavarde;
     res.send("<h1>Pridėti vartotoją</h1>"+"Vartotojo vardas: "+req.body.vardas+"<br>Pavarde:"+req.body.pavarde);
 });
 
 //Jei vartotojas nusikopijavo nuorodą ir atėjo ne per formą(POST metodą), o įklijavęs nuorodą (GET metodą)
 //Tuomet mes jį redirektiname į /users nuorodą (įvedo formą)
 router.get('/add', (req, res, next)=>{
     res.redirect('/user');
 });


//Exportuojame router objektą su mūsų middlewares
module.exports=router;