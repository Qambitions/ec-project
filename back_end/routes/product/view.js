var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryItem(props){
    var rawSQL = ` 
                    select masp, malh, ten_sp, hinh_anh, luot_danh_gia, sao, gia_ban, pp.ten_npp,
                    tong_da_ban,phan_tram_giam_gia, 
                    giam_toi_da, gia_ban - GREATEST(gia_ban*COALESCE((100-phan_tram_giam_gia)/100,0),COALESCE(giam_toi_da,0)) as gia_ban_giam
                    from san_pham sp 
                    left join voucher v on sp.ma_voucher = v.ma_voucher 
                    left join nha_phan_phoi pp on pp.manpp = sp.manpp
                    where true = true  
                    `
    if (typeof props.malh != 'undefined') {
        rawSQL += ` AND malh = '${props.malh}' ` 
        rawSQL += ` limit '${props.limit}' offset '${props.offset}' `
    }
    else if (typeof props.masp != 'undefined') rawSQL += ` AND masp = '${props.masp}' `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
    });
    return result.rows
}


router.get('/', async (req, res, next) =>{
    req.query.limit = (typeof req.query.limit === 'undefined') ? 5 : req.query.limit;
    req.query.offset = (typeof req.query.offset === 'undefined') ? 0 : req.query.offset;
    req.query.offset = req.query.offset * req.query.limit
    var response = {
        "exitcode": 101,
        "message": "Thông tin sai / không có sản phẩm",
        'items':''
    }

    try{
        const itemsInformation = await queryItem(req.query);
        var star = {
            'avg':0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
        }
        
        for (var i=0; i<itemsInformation.length; i++){
            star.avg = itemsInformation[i].sao 
            itemsInformation[i].sao = star // view không cần có star chi tiết

        }
        if (itemsInformation.length > 0) {
            response.message      = "Lấy thông tin sản phẩm thành công"
        }
        response.exitcode     = 0
        response.items        = itemsInformation
        
    }
    catch (e){
        response.exitcode =1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
        
    return res.send(response)
});

module.exports = router;
