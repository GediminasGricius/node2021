const express=require('express');

const router=express.Router();

router.get('/', (req,res, next)=>{
    res.render('index');
});

router.get('/meniu', (req,res,next)=>{
    res.render('menu');
});

router.get('/atsiliepimai', (req,res,next)=>{
    res.render('feedback');
});

router.post('/atsiliepimai', (req,res,next)=>{

});

router.get('/kontaktai', (req, res, next)=>{
    res.render('contacts');
});



module.exports=router;