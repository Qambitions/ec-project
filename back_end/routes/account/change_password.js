var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;

async function checkClient(props){
    if (typeof(props.token) == "undefined") props.token = '' 
    
    const rawSQL = ` 
                    select makh
                    from khach_hang kh 
                    where kh_token = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}' 
                    and kh.kh_token is not null
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
    });
    return result.rows[0]
}

async function changePassword(props, client){
    // console.log(props)
    var ma_khach_hang = null
    await knexQuery('khach_hang')
    .where('makh', '=', client.makh)
    .andwhere('mat_khau','=',crypto.createHmac("sha256", secret).update(props.mat_khau_cu).digest("base64"))
    .update({
        mat_khau : crypto.createHmac("sha256", secret).update(props.mat_khau_moi).digest("base64")
    }).returning('makh').then(function (makh){
        console.log(makh)
        ma_khach_hang = makh
    })
    .catch(error => {
        console.log(error)
        throw new Error(error);
    });
    if (makh != client.makh) return false
    return true
}

router.post('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
    }
    const Client = await checkClient(req.headers);
    try {
        if (typeof(Client) == "undefined"){
            response.exitcode = 106
            response.message = "Token không tồn tại/user không tồn tại"
            return res.send(response)
        }
        const addComment = await pushComment(req.body,Client);
        if (addComment == false){
            response.exitcode   = 163
            response.message    = "Mật khẩu cũ không đúng!"
            return res.send(response)
        }
        response.exitcode   = 0
        response.message    = "Update thông tin thành công"
    }
    catch (e){
      response.exitcode= 1
      response.message = e
      response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
    
});

module.exports = router;