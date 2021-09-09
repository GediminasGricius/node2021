
let db;
MongoClient.connect(connectionURL).then((client)=>{
   const db=client.db(dbName);
   db=db;
   console.log("Prisijungėme prie duomenų bazės");
   tess.setSK(99);
});

module.exports={getSK, setSK};