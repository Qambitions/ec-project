var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryItem(props){
    const rawSQL = `  
                    select masp, ten_sp, mo_ta, hinh_anh, luot_danh_gia, sao, gia_ban, pp.ten_npp,
                    khoi_luong, tong_da_ban, phan_tram_giam_gia, 
                    gia_ban - GREATEST(gia_ban*COALESCE(phan_tram_giam_gia,0),COALESCE(giam_toi_da,0)) as gia_ban_giam
                    from san_pham sp 
                    left join voucher v on sp.ma_voucher = v.ma_voucher
                    left join nha_phan_phoi pp on pp.manpp = sp.manpp  
                    where masp = '${props.masp}'
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
    });
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
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
    });
    return result.rows
}

async function queryComment(props){
    const rawSQL = ` 
                    select tenkh, masp, noi_dung, ngay_dang
                    from danh_gia dg
                    left join khach_hang kh on kh.makh = dg.makh 
                    where masp = '${props.masp}'
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
    });
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
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
    });
    if (result.rowCount == 0){
        return 0
    }
    return result.rows[0].sum
}

async function queryChiNhanhCon(props){
    var rawSQL = ` select * from chi_nhanh cn2
                    where macn in (select macn 
                    from kho
                    where masp = ${props.masp}
                    and so_luong_ton > 0)
                    `
    // return knexQuery.select().from("store_admin");
    const branch_available = await knexQuery.raw(rawSQL)
    rawSQL = ` select * from chi_nhanh cn2
                    where macn not in (select macn 
                    from kho
                    where masp = ${props.masp}
                    and so_luong_ton > 0)
                    `
    const branch_unavailable = await knexQuery.raw(rawSQL)

    return {branch_available: branch_available.rows, 
            branch_unavailable: branch_unavailable.rows}
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
        
        var star = {
            'avg':0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
        }
        const saoitems = await queryItemStar(req.query);
    
        star.avg = itemsInformation.sao
        star['1'] = (typeof saoitems['1'] === 'undefined') ? 0 : saoitems['1']
        star['2'] = (typeof saoitems['2'] === 'undefined') ? 0 : saoitems['2']
        star['3'] = (typeof saoitems['3'] === 'undefined') ? 0 : saoitems['3']
        star['4'] = (typeof saoitems['4'] === 'undefined') ? 0 : saoitems['4']
        star['5'] = (typeof saoitems['5'] === 'undefined') ? 0 : saoitems['5']

        const tonkho = await queryStock(req.query);
        const chi_nhanh_con = await queryChiNhanhCon(req.query);
        const comment = await queryComment(req.query)
        var item = {
            'masp':itemsInformation.masp,
            'tensp':itemsInformation.ten_sp,
            'mo_ta':itemsInformation.mo_ta,
            'hinh_anh':itemsInformation.hinh_anh,
            'luot_danh_gia':itemsInformation.luot_danh_gia,
            'sao':star,
            'gia_ban_goc':itemsInformation.gia_ban,
            'khoi_luong':itemsInformation.khoi_luong,
            'tong_da_ban':itemsInformation.tong_da_ban,
            'ton_kho':tonkho,
            // 'chi_nhanh_con':chi_nhanh_con,
            'gia_ban_giam' : itemsInformation.gia_ban_giam,
            'comment' : comment,
            'ten_npp' : itemsInformation.ten_npp,
            'branch_available': chi_nhanh_con.branch_available,
            'branch_unavailable': chi_nhanh_con.branch_unavailable
        };
        
        
        response.message      = "Lấy thông tin sản phẩm thành công"
        response.exitcode     = 0
        response.item         = item
        console.log(item)
    }
    catch (e){
        response.exitcode=1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
});

module.exports = router;
