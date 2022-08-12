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

async function pushAddress(props, client){
    // console.log(props)
    const rawSQL = ` 
                    select max(stt) as max_stt
                    from dia_chi_kh 
                    where makh = '${client.makh}' 
                    group by makh
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
    });
    
    await knexQuery('dia_chi_kh')
    .insert({
        makh: client.makh,
        stt: result.rows[0].max_stt + 1,
        districtid: props.districtid,
        so_nha_duong: props.so_nha_duong,
        phuong_xa: props.phuong_xa,
        quan_tp: props.quan_tp,
        tp_tinh: props.tp_tinh,
        mac_dinh: false
    }).catch(error => {
        console.log(error)
    });
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
        const addAdress = await pushAddress(req.body,Client);
        if (addAdress == false){
            response.exitcode   = 136
            response.message    = "lỗi lạ chưa define được"
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