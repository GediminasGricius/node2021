const express=require('express');

const router=express.Router();

router.get('/', (req, res, next)=>{
  //Paimame įrašus iš duomenų bazės  
  db.collection('contacts').find({}).toArray().then((contacts)=>{
    res.render('index',{contacts:contacts});
  }).catch((error)=>{
    console.log("Klaida paimant įrašus")
  }); 
  
});

router.get('/new', (req, res, next)=>{
    res.render('new');
});

router.post('/new', (req, res, next)=>{
    //Idedame įrašus į duomenų bazę
    db.collection('contacts').insertOne(req.body).then((result)=>{
        res.redirect('/');
    });
    
});

module.exports=router;