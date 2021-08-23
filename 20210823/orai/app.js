const forecast=require('./forecast');

/*
function atspausdinkTemperatura(temp) {
    console.log("Temperatura: "+temp);
}
*/

forecast('klaipeda', (temp)=>{
    console.log("Temperatura: "+temp);
});

