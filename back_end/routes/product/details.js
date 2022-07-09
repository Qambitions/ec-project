var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryItem(props){
    const rawSQL = `  
                    select masp, ten_sp, mo_ta, hinh_anh, luot_danh_gia, sao, gia_ban, 
                    cong_kenh, tong_da_ban, phan_tram_giam_gia, 
                    gia_ban - GREATEST(gia_ban*COALESCE(phan_tram_giam_gia,0),COALESCE(giam_toi_da,0)) as gia_ban_giam
                    from san_pham sp 
                    left join voucher v on sp.ma_voucher = v.ma_voucher 
                    where masp = '${props.masp}'
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    return result.rows[0]
}

async function queryItemStar(props){
    const rawSQL = ` 
                    select sao, count(sao)
                    from danh_gia dg 
                    where masp = '${props.masp}'
                    group by 1
                    order by sao
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    return result.rows
}

async function queryStock(props){
    const rawSQL = ` 
                    select sum(so_luong_ton)
                    from kho
                    where masp = '${props.masp}'
                    group by masp
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    if (result.rowCount == 0){
        return 0
    }
    return result.rows[0].sum
}

async function queryChiNhanhCon(props){
    const rawSQL = ` 
                    select count(macn)
                    from kho
                    where masp = '${props.masp}'
                    group by masp
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    if (result.rowCount == 0){
        return 0
    }
    return result.rows[0].count
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 105,
        "message": "Sản phầm không tồn tại",
        'item':''
    }
    
    const itemsInformation = await queryItem(req.body);
    if (typeof itemsInformation == 'undefined'){
        res.send(response)
        return
    }
    
    var star = {
        'avg':0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
    }
    const saoitems = await queryItemStar(req.body);
   
    star.avg = itemsInformation.sao
    star['1'] = (typeof saoitems['1'] === 'undefined') ? 0 : saoitems['1']
    star['2'] = (typeof saoitems['2'] === 'undefined') ? 0 : saoitems['2']
    star['3'] = (typeof saoitems['3'] === 'undefined') ? 0 : saoitems['3']
    star['4'] = (typeof saoitems['4'] === 'undefined') ? 0 : saoitems['4']
    star['5'] = (typeof saoitems['5'] === 'undefined') ? 0 : saoitems['5']

    const tonkho = await queryStock(req.body);
    const chi_nhanh_con = await queryChiNhanhCon(req.body);
    var item = {
        'masp':itemsInformation.masp,
        'tensp':itemsInformation.ten_sp,
        'mo_ta':itemsInformation.mo_ta,
        'hinh_anh':itemsInformation.hinh_anh,
        'luot_danh_gia':itemsInformation.luot_danh_gia,
        'sao':star,
        'gia_ban_goc':itemsInformation.gia_ban,
        'cong_kenh':itemsInformation.cong_kenh,
        'tong_da_ban':itemsInformation.tong_da_ban,
        'ton_kho':tonkho,
        'chi_nhanh_con':chi_nhanh_con,
        'gia_ban_giam' : itemsInformation.gia_ban_giam
    };
    
    
    response.message      = "Lấy thông tin sản phẩm thành công"
    response.exitcode     = 0
    response.item         = item
    
    res.send(response)
});

module.exports = router;
