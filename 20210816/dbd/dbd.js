const dbd= (x, y) => {
    for (let i=y; i>=1; i--){
        if (x % i==0 && y % i==0 ){
            
            return i;
        }
    }
}

module.exports=dbd;