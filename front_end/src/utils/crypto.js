var CryptoJS = require("crypto-js");

function encrypt10(text, spec){
    let plaintext =  text.toString();
    let secSpec =  process.env.REACT_APP_SEC_KEY;    
    let ivSpec =  spec.toString();

    // secSpec = CryptoJS.lib.WordArray.create(secSpec.words.slice(0, 16/4));
    // ivSpec = CryptoJS.lib.WordArray.create(ivSpec.words.slice(0, 16/4));
  
    var encrypted = CryptoJS.AES.encrypt(plaintext, secSpec, {iv: ivSpec});
  
    return encrypted;
}

 function decrypt10(text,spec){
    let plaintext =  text.toString();
    let secSpec =  process.env.REACT_APP_SEC_KEY;    
    let ivSpec =  spec.toString();
  
    // secSpec = CryptoJS.lib.WordArray.create(secSpec.words.slice(0, 16/4));
    // ivSpec = CryptoJS.lib.WordArray.create(ivSpec.words.slice(0, 16/4));

    console.log("pltxt",plaintext);
    console.log("sec",secSpec);
    console.log("iv",ivSpec);

    var decrypted = CryptoJS.AES.decrypt(plaintext, secSpec, {iv: ivSpec}).toString();
    return decrypted;
}

export {encrypt10, decrypt10}