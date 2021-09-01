const express=require('express');
//systemRoutes - kinamasis kuris būs router objektas ir turės jame aprašytus middleware
const systemRouter=require('./routes/system');
//puslapio router, kuriame yra middleware's susiję su puslapiu
const pageRouter=require('./routes/page');
//user router
const userRouter=require('./routes/user');
const path = require('path');

const app=express();

//Užregistruojame Body-parser middleware kuris sutvarko atsiųstus duomenis
app.use(express.urlencoded({extended:false}));

//Registruojame express.static middleware kuris pagal užklausas atsiųs failus iš katalogo, 
//kurį mes padavėme kaip kintamajį middleware sukūrimo f-jai
app.use(express.static(path.join(__dirname,'public')));
app.use(systemRouter);
app.use('/user',userRouter);
app.use(pageRouter);




app.listen(3000);
