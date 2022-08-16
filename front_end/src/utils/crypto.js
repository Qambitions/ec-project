var CryptoJS = require("crypto-js");

function encrypt10(text, spec){
    let plaintext =  text.toString();
    let secSpec =  process.env.REACT_APP_SEC_KEY;    
    let ivSpec =  spec.toString();
  
    var encrypted = CryptoJS.AES.encrypt(plaintext, secSpec, {iv: ivSpec});
  
    return encrypted;
}

 function decrypt10(text,spec){
    let plaintext =  text.toString();
    let secSpec =  process.env.REACT_APP_SEC_KEY;    
    let ivSpec =  spec.toString();

    var decrypted = CryptoJS.AES.decrypt(plaintext, secSpec, {iv: ivSpec}).toString();
    return decrypted;
}

export {encrypt10, decrypt10}