module.exports = {
    makeIntegerArray(count, min, max){
        let array = [];

        for(let i = 0; i < count; i++){
            let num = min + Math.round(Math.random() * (max - min));
            array.push(num)
        }

        return array;
    }
}