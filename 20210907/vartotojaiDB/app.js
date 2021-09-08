/*
const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
const ObjectId=mongodb.ObjectId;
*/
const {MongoClient, ObjectId}=require('mongodb');

const connectionURL='mongodb://127.0.0.1:27017'; //Duomenų bazės vieta (serveris)
const dbName='vartotojai';                       //Duomenų bazės pavadinimas
function labas () {
    console.log("asd");
}
//Jungiamies prie duomenų bazės
MongoClient.connect(connectionURL,  async (error, client)=>{
    if (error){  //Jei klaida, tuomet informuojame ir išeiname iš programos
        return console.log("Nepavyksta prisijungti!");
    }
    //Tesiame jei nėra klaidos
    console.log("Prisijungta prie duomenų bazės");

    const db=client.db(dbName); //Jungiamies prie DB (jei nėra, tai ją sukurs)

/*
    db.collection('vardai').findOne({
        vardas: "Gediminas" 
    }, (error, user)=>{
        if (error){
            return "Įvyko klaida paimant įrašą";
        }
        console.log(user);
    });
*/
    let user= await db.collection('vardai').findOne({_id: new ObjectId("6137a705e0a83665d9934260") }); 
    let kiekis= await db.collection('vardai').find({vardas:user.vardas}).count();
    
    console.log(user)
    console.log("ads",kiekis);
    
    
   /* //Vartotojo pridėjimas į duomenų bazę
    db.collection('vardai').insertOne({
        vardas:'Jonas',
        pavarde:'Jonaitis',
        atlyginimas:1200
    }, (error, result)=>{
        if (error){
            return console.log('Įrašas neįsiterpė');
        }
        console.log('Įrašas įterptas');
    });
    */
   /*
    //Paimkime vieną įrašą kurio id  "6137aa27936f7d0ed5850bc3"
    db.collection('vardai').findOne({
        _id: new ObjectId("6137aa27936f7d0ed5850bc3")  //ID privalo buti sukurtas objektas, kuris grazina 12 buferi
    }, (error, user)=>{
        if (error){
            return "Įvyko klaida paimant įrašą";
        }
        console.log(user);
    })
    */
   /*
   //Paimkime visus kolekcijos dokumentus ir juos atvaizduokime
   db.collection('vardai').find({
       vardas:"Jonas"
   }).toArray((error, users)=>{
        if (error){
            return console.log("Nepaimu įrašų");
        }
        console.log(users);
   });
   */
  /*
   const kiekis=await db.collection('vardai').find({
    vardas:"Jonas"
   }).count();
   console.log("Viso Jonu: "+kiekis);
   //Suzinokime kiek yra Jonu
   db.collection('vardai').findOne()
   */
   /*
   db.collection('vardai').find({
    vardas:"Jonas"
   }).count((error, kiekis)=>{
        if (error){
            return console.log("Nepaimu įrašų");
        }
        console.log("Viso Jonu: "+kiekis);
   });
   */
});