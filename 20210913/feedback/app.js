const express=require('express');
require('./db/mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const feedbackRoutes=require('./routes/feedbackRoutes');
const userRoutes=require('./routes/userRoutes');
const app=express();


app.use(express.json())
app.use(feedbackRoutes);
app.use(userRoutes);
app.listen(3000);

//console.log( jwt.sign({_id:545454}, 'Kz585++64') );

/*
bcrypt.hash("Labas", 10).then((code)=>{
  console.log(code);
});
*/
/*

bcrypt.compare("Labass", "$2b$10$aZNbyIeZsYhTE4waOZ8cPOQN/Op5RarwbmKE4EdDrovMsR22OSvdW").then((result)=>{
  console.log(result);
});
*/

