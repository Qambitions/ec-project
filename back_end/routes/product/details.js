var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryItem(props){
    const rawSQL = ` 
                    select masp, ten_sp, mo_ta, hinh_anh, luot_danh_gia, sao, gia_ban, cong_kenh, tong_da_ban
                    from san_pham sp 
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
    return result.rows[0].sum
}

async function queryChiNhanhCon(props){
    const rawSQL = ` 
                    select count(macn)
                    from kho
                    where masp =
                    group by masp
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    return result.rows[0].count
}

async function queryVoucher(props){
    const rawSQL = ` 
                    select v.phan_tram_giam_gia, v.giam_toi_da 
                    from san_pham sp 
                    left join voucher v on sp.ma_voucher = v.ma_voucher 
                    where masp = '${props.masp}'
                    AND tg_bat_dau <= '${date_str}'
                    AND '${date_str}'<= tg_ket_thuc
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    return result.rows[0]
}



router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
        'item':''
    }
    const itemsInformation = await queryItem(req.body);
    const saoitems = await queryItemStar(req.body);
    const tonkho = await queryStock(req.body);
    const chi_nhanh_con = await queryChiNhanhCon(req.body);
    const promotion = await queryVoucher(req.body);
    const gia_giam = Math.min(itemsInformation.gia_ban*promotion.phan_tram_giam_gia,promotion.giam_toi_da);
    var item = {
        'masp':itemsInformation.masp,
        'tensp':itemsInformation.tensp,
        'mo_ta':itemsInformation.mo_ta,
        'hinh_anh':itemsInformation.hinh_anh,
        'luot_danh_gia':itemsInformation.luot_danh_gia,
        'sao':itemsInformation.sao,
        'gia_ban_goc':itemsInformation.gia_ban,
        'cong_kenh':itemsInformation.cong_kenh,
        'tong_da_ban':itemsInformation.tong_da_ban,
        'ton_kho':tonkho,
        'chi_nhanh_con':chi_nhanh_con,
        'gia_ban_giam' : itemsInformation.gia_ban - gia_giam
    };
    
    
    response.message      = "Lấy thông tin sản phẩm thành công"
    response.exitcode     = 0
    response.item         = item
    
    res.send(response)
});

module.exports = router;
