function fibo(n){
    let f = 0, g = 1;
    while(n--){
        g += f;
        f = g - f;
    }

    return f;
}


for(let i = 0; i <= 10; i++){
    console.log(fibo(i));
}