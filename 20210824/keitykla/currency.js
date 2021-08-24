const request=require('postman-request');

const currency=(from, to, callback)=>{
    let end=new Date().toISOString().slice(0,10);
    let start=new Date();
    start.setDate(start.getDate()-10);
    start=start.toISOString().slice(0,10);

    const url='https://api.frankfurter.app/'+start+'..'+end+'?from='+from+'&to='+to;
    request({url:url},(error, response)=>{
       const data=JSON.parse(response.body);
       const rates=[];
       for (const [date, rate] of Object.entries(data.rates)){
           rates.push({
                date:date,
                rate:rate[to]
           });
       }
       callback(rates);
    });
}

module.exports=currency;