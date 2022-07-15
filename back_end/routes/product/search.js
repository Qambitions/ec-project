var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryItem(props){
    const rawSQL = ` 
                    select masp, ten_sp, hinh_anh, luot_danh_gia, sao, gia_ban, 
                    tong_da_ban,phan_tram_giam_gia, 
                    giam_toi_da, gia_ban - GREATEST(gia_ban*COALESCE(phan_tram_giam_gia,0),COALESCE(giam_toi_da,0)) as gia_ban_giam
                    from san_pham sp        
                    left join voucher v on sp.ma_voucher = v.ma_voucher
                    where masp in (select masp
                    from san_pham sp 
                    left join loai_hang lh on sp.malh = lh.malh 
                    where to_tsvector(ten_sp || ' ' || mo_ta || ' ' || lh.ten_lh) @@ to_tsquery('${props.search_str}'))
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    return result.rows
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
        'list_items':''
    }
    const itemsInformation = await queryItem(req.body);
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
        itemsInformation[i].sao = star

    }

    response.message      = "search thành công"
    response.exitcode     = 0
    response.item         = itemsInformation
    
    res.send(response)
});



module.exports = router;