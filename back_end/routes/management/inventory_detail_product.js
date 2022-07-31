var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryItem(props){
    const rawSQL = `  
                    select masp, ten_sp, mo_ta, ma_voucher, hinh_anh, luot_danh_gia, sao, gia_ban, pp.ten_npp,
                    tong_da_ban, lh.ten_lh
                    from san_pham sp 
                    left join nha_phan_phoi pp on pp.manpp = sp.manpp  
                    left join loai_hang lh on sp.malh = lh.malh 
                    where masp = '${props.masp}'
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
    });
    return result.rows[0]
}

async function queryStock(props){
    const rawSQL = ` 
                    select sum(so_luong_ton)
                    from kho
                    where masp = '${props.masp}'
                    and macn = '${props.macn}'
                    group by masp,macn
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
    });
    if (result.rowCount == 0){
        return 0
    }
    return result.rows[0].sum
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 105,
        "message": "Sản phầm không tồn tại",
        'item':''
    }
    
    try{
        const itemsInformation = await queryItem(req.query);
        if (typeof itemsInformation == 'undefined'){
            res.send(response)
            return
        }
        var tonkho = await queryStock(req.query);
        var item = {
            'masp':itemsInformation.masp,
            'tensp':itemsInformation.ten_sp,
            'mo_ta':itemsInformation.mo_ta,
            'hinh_anh':itemsInformation.hinh_anh,
            'luot_danh_gia':itemsInformation.luot_danh_gia,
            'sao':itemsInformation.sao,
            'gia_ban_goc':itemsInformation.gia_ban,
            'khoi_luong':itemsInformation.khoi_luong,
            'tong_da_ban':itemsInformation.tong_da_ban,
            'ton_kho':tonkho,
            'ten_npp' : itemsInformation.ten_npp,
            'ten_lh': itemsInformation.ten_lh,
        };
        
        
        response.message      = "Lấy thông tin sản phẩm thành công"
        response.exitcode     = 0
        response.item         = item
        // console.log(item)
    }
    catch (e){
        response.exitcode=1
        response.message = e
    }
    return res.send(response)
});

module.exports = router;
