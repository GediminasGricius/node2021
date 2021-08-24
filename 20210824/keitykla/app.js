let currency=require('./currency');

currency('EUR','RUB', (rates)=>{
    rates.forEach((rate)=>{
        console.log('Data: '+rate.date+' Kursas: '+rate.rate);
    });
});