function Utils() {

}

Utils.prototype.fullWithSpaces = (str) => {
    const strLen = str.length;
    if(strLen < 10){
        const max = 10 - strLen;
        for(let i = 0; i < max; i++){
            str += ' ';
        }
    }

    return str;
};

module.exports = Utils;