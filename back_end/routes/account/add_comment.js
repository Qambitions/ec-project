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

async function pushComment(props, client){
    // console.log(props)
    const rawSQL = ` 
                    select masp
                    from san_pham
                    where masp = '${props.masp}' 
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    // console.log(result)

    await knexQuery('danh_gia')
    .insert({
       makh: client.makh,
       masp: props.masp,
       noi_dung: props.noi_dung,
       sao: props.sao
    }).catch(error => {
        console.log(error)
        throw new Error(error);
    });
}

router.post('/', async (req, res, next) =>{
    // mình thêm comment và xóa vài cái console.log
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
            response.exitcode   = 136
            response.message    = "Mã sản phẩm không tồn tại"
            return res.send(response)
        }
        console.log("user : ", Client, " add comment thành công")
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