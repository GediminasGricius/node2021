const express=require('express');
const router=express.Router();
const Feedback=require('./../model/feedback')
const auth=require('./../middleware/auth');

router.get('/feedback',  (req, res, next)=>{
    Feedback.find({}).then((feedbacks) =>{
        res.send(feedbacks);
    }).catch((e)=>{
        res.status(500).send(e);
    })
});

router.get('/feedback/:id',  (req,res, next)=>{
    //Paimame id iš URL
    //Jei url butų localhost:3000/feedback/2d3d12231d4   , tuomet id = 2d3d12231d4
    const id=req.params.id;
    Feedback.findById(id).then((feedback)=>{
        if (!feedback){
            return res.status(404).send();
        }
        res.send(feedback);
    }).catch((e)=>{
        res.status(500).send(e);
    });
});


router.post('/feedback', auth, (req, res, next)=>{
    const feedback=new Feedback(req.body);
    feedback.save().then(()=>{
        res.status(201).send(feedback);
    }).catch((e)=>{
        res.status(400).send(e);
    });
})

router.patch('/feedback/:id', auth, async (req, res)=>{
    try {
        //Pasiimame seną feedback iš duomenų bazės
        const feedback=await Feedback.findById(req.params.id);

        //Iš atsiųsto JSON failo, paimame atsiųstų atnaujinti laukų sąrašą (masyvą)
        const updates=Object.keys(req.body);

        //Laukai kuriuos galime keisti
        const allowed=['name','email','text'];

        //Ar visi atsiusti laukai iš masyvo updates yra allowed masyve
        if (! updates.every((update)=>allowed.includes(update))){
            //Jei ne nutraukiame vykdymą ir gražiname 400 klaida
            return res.status(400).send({error:"Neteisingi atnaujinimo laukai"});
        }

        //Einame per visus atnaujinamus laukus
        updates.forEach((update) => {
            //Sename įraše pakeičiame laukų reikšmes naujomis
            feedback[update]=req.body[update];
        });
        //Išsaugome naują įrašą į duomenų bazę
        await feedback.save();

        //Išsiunčiame pakeistą įrašą
        res.send(feedback);
    } catch (error) {
        res.status(400).send(error);
    }
   
});

router.delete('/feedback/:id', auth, async (req, res)=>{
    try {
        //Pagal atsiųstą id, surandame ir ištriname įrašą
        //Jei įrašas yra ištrintas, jis grąžinamas kaip kintamasis feedback 
       const feedback=await Feedback.findByIdAndDelete(req.params.id);

       //Jei niekas negrąžinama išmetame klaidą, kad įrašas nerastas 
       if (!feedback){
           return res.status(404).send({error:"Įrašas nerastas"});
       }

       //Jei nebuvo klaidos grąžiname įrašą
       return res.send(feedback);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports=router;