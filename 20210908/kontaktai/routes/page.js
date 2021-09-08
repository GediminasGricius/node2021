const express=require('express');

const router=express.Router();

router.get('/', (req, res, next)=>{
  res.render('index');
});

router.get('/new', (req, res, next)=>{
    res.render('new');
});

router.post('/new', (req, res, next)=>{
    res.redirect('/');
});

module.exports=router;