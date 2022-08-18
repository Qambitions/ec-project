import axios from "../api/axios";

async function callAutoLoginAPI(_token){
    await axios({
        url: process.env.REACT_APP_AUTO_LOGIN,
        method:'post',
        headers: {token:_token},
    }).then((res)=>{return res})
}

export {callAutoLoginAPI}