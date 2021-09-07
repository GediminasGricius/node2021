const express=require('express');
const menu=require('./../modules/menu');
const feedback=require('./../modules/feedback');

const router=express.Router();

router.get('/', (req,res, next)=>{
   
    res.render('index', {
        title : 'Restoranas Jūros žvaigždė'
    });
});

router.get('/meniu', (req,res,next)=>{
    const restoranMenu = menu.getMenu();
    res.render('menu', {
        title : 'Restorano meniu',
        menu: restoranMenu
    });
});

router.get('/atsiliepimai', (req,res,next)=>{
    const fb=feedback.getFeedback();
    res.render('feedback',{
        title : 'Atsiliepimai',
        feedbacks: fb
    });
});

router.post('/atsiliepimai', (req,res,next)=>{
    feedback.addFeedback(req.body.name, req.body.text);
    res.redirect('/atsiliepimai');
});

router.get('/kontaktai', (req, res, next)=>{
    res.render('contacts',{
        title : 'Kontaktai',
       // feedbacks: fb
    });
});

router.post('/delete', (req, res, next)=>{
   console.log("Istrinti: "+req.body.no);
   res.redirect('/atsiliepimai');
});


module.exports=router;