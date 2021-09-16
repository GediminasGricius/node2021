const express=require("express");
const User=require("./../model/user")
const router=express.Router();

router.get('/user', (req, res)=>{
    
     res.send(User.getAllUsers());
  
});

router.post('/user/login', async (req, res)=>{
    try{
        const user=await User.findByEmail(req.body.email, req.body.password);
        const token=await user.generateAuthToken();
        res.send({user, token});

    } catch (e) {
        res.status(400).send(e);

    }
});

router.post('/user', (req,res)=>{
   const user=new User(req.body);
   user.save().then(async ()=>{
       await user.generateAuthToken();
       res.status(201).send(user);
   }).catch((e)=>{
       res.status(500).send(e);
   })
});


module.exports=router;