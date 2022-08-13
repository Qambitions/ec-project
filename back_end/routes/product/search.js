var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

async function queryItem(props){
    var string_search1 = removeAccents(props.search_str).split(' ').join('|');
    var string_search2 = props.search_str.split(' ').join('|');
    // console.log(string_search2)
    const rawSQL = ` 
                    select masp, ten_sp, hinh_anh, luot_danh_gia, sao, gia_ban, 
                    tong_da_ban,phan_tram_giam_gia, 
                    giam_toi_da, gia_ban - ROUND(LEAST(gia_ban*COALESCE(phan_tram_giam_gia::numeric/100,0),COALESCE(giam_toi_da,0))) as gia_ban_giam
                    from san_pham sp        
                    left join voucher v on sp.ma_voucher = v.ma_voucher
                    where masp in (select masp
                    from san_pham sp 
                    left join loai_hang lh on sp.malh = lh.malh 
                    left join nha_phan_phoi npp on npp.manpp = sp.manpp 
                    where (to_tsvector(convertTVkdau(lower(ten_sp)) || ' ' || 
                        convertTVkdau(lower(mo_ta)) || ' ' ||
                        convertTVkdau(lower(npp.ten_npp)) || ' ' || 
                        convertTVkdau(lower(lh.ten_lh)) || ' ') @@ to_tsquery(lower('${string_search1.normalize()}')))
                    or (to_tsvector(lower(ten_sp) || ' ' || lower(mo_ta) || ' ' || lower(lh.ten_lh) || ' ' || lower(npp.ten_npp)) @@ to_tsquery(lower('${string_search2.normalize()}'))))
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    return result.rows
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Thông tin sai / không có sản phẩm",
        'list_items':''
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
        // console.log(itemsInformation)
        for (var i=0; i<itemsInformation.length; i++){
            star.avg = itemsInformation[i].sao 
            itemsInformation[i].sao = star

        }
        if (itemsInformation.length > 0) {
            response.message      = "search thành công"
        }
        response.exitcode     = 0
        response.item         = itemsInformation
    }
    catch (e){
        response.exitcode =1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
        
    return res.send(response)
});



module.exports = router;