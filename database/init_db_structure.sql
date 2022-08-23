DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


CREATE TABLE CAP_BAC (
	MA_CAP_BAC INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1),
	LOAI_CAP_BAC TEXT,
	PHAN_TRAM_GIAM_GIA INT DEFAULT 0,

	CONSTRAINT PK_CAP_BAC PRIMARY KEY(MA_CAP_BAC)
);

CREATE TABLE KHACH_HANG (
	MAKH INT GENERATED ALWAYS AS IDENTITY(START WITH 1000000 INCREMENT BY 1),
	MA_CAP_BAC INT default 1,
	TENKH TEXT,
	EMAIL_KH VARCHAR(60) NOT NULL UNIQUE,
	SDT_KH CHAR(10),
	NGSINH_KH DATE,
	TONG_DIEM_TICH_LUY INT DEFAULT 0,
	MAT_KHAU VARCHAR(65) NOT NULL,
	KH_TOKEN VARCHAR(100),
	CHECK_SD_VOUCHER BOOL,
	THOI_GIAN_DK timestamp default current_timestamp,
	ACTIVATE BOOL default true,
	tong_so_don_da_mua INT DEFAULT 0,
	tong_so_don_da_huy INT DEFAULT 0,

	CONSTRAINT PK_KHACH_HANG PRIMARY KEY(MAKH),
	CONSTRAINT FK_KH_CAP_BAC FOREIGN KEY(MA_CAP_BAC) REFERENCES CAP_BAC(MA_CAP_BAC)

);

CREATE TABLE NHA_PHAN_PHOI (
	MANPP INT GENERATED ALWAYS AS IDENTITY(START WITH 1000 INCREMENT BY 1),
	TEN_NPP TEXT NOT NULL,
	SO_NHA_DUONG TEXT,
	PHUONG_XA TEXT,
	QUAN_TP TEXT,
	TP_TINH TEXT,

	CONSTRAINT PK_NPP PRIMARY KEY (MANPP)
);

CREATE TABLE CHI_NHANH (
	MACN INT GENERATED ALWAYS AS IDENTITY(START WITH 200 INCREMENT BY 1),
	SDT_CN CHAR(10),
	SO_NHA_DUONG TEXT UNIQUE,
	PHUONG_XA TEXT,
	QUAN_TP TEXT,
	DISTRICTID text,
	TP_TINH TEXT,

	CONSTRAINT PK_CNHANH PRIMARY KEY(MACN)
);

CREATE TABLE PHIEU_NHAP_HANG (
	MAPN INT GENERATED ALWAYS AS IDENTITY(START WITH 10000 INCREMENT BY 1),
	MANPP INT,
	MACN INT,
	NGAY_LAP timestamp default current_timestamp,
	TONG_TIEN_NHAP NUMERIC DEFAULT 0,
	TONG_SO_MAT_HANG INT DEFAULT 0,
	
	CONSTRAINT FK_PN_NPP FOREIGN KEY(MANPP) REFERENCES NHA_PHAN_PHOI(MANPP),
	CONSTRAINT FK_PN_CN FOREIGN KEY(MACN) REFERENCES CHI_NHANH(MACN),
	CONSTRAINT PK_PHIEU_NHAP_HANG PRIMARY KEY(MAPN)
);

CREATE TABLE LOAI_HANG (
	MALH INT GENERATED ALWAYS AS IDENTITY(START WITH 10 INCREMENT BY 1),
	TEN_LH TEXT,

	CONSTRAINT PK_LOAI_HANG PRIMARY KEY(MALH)
);

CREATE TABLE VOUCHER (
	MA_VOUCHER INT GENERATED ALWAYS AS IDENTITY(START WITH 100000 INCREMENT BY 1),
	PHAN_TRAM_GIAM_GIA INT DEFAULT 0,
	GIAM_TOI_DA NUMERIC DEFAULT 10000,
	TG_BAT_DAU timestamp NOT NULL,
	TG_KET_THUC timestamp,
	PHAN_LOAI TEXT,
	SO_LUONG_VOUCHER int default 50,

	CONSTRAINT PK_VOUCHER PRIMARY KEY (MA_VOUCHER)
);

CREATE TABLE HINH_THUC_THANH_TOAN (
	MAHT TEXT,
	TEN_HINH_THUC TEXT,

	CONSTRAINT PK_HINH_THUC_THANH_TOAN PRIMARY KEY (MAHT)
);

CREATE TABLE HINH_THUC_GIAO_HANG (
	MAHT TEXT,
	TEN_HINH_THUC TEXT,

	CONSTRAINT PK_HINH_THUC_GIAO_HANG PRIMARY KEY (MAHT)
);


CREATE TABLE SAN_PHAM (
	MASP INT GENERATED ALWAYS AS IDENTITY(START WITH 200000 INCREMENT BY 1),
	MALH INT,
	MANPP INT,
	MA_VOUCHER INT,
	TEN_SP TEXT,
	HINH_ANH VARCHAR(500),
	MO_TA TEXT,
	LUOT_DANH_GIA INT DEFAULT 0,
	TONG_DA_BAN INT DEFAULT 0,
	SAO NUMERIC(3,2) DEFAULT 0,
	KHOI_LUONG INT,
--	PHAN_LOAI INT,
	GIA_BAN NUMERIC,

	CONSTRAINT PK_SAN_PHAM PRIMARY KEY(MASP),
	CONSTRAINT FK_SP_LH FOREIGN KEY (MALH) REFERENCES LOAI_HANG (MALH),
	CONSTRAINT FK_SP_NPP FOREIGN KEY (MANPP) REFERENCES NHA_PHAN_PHOI(MANPP),
	CONSTRAINT FK_SP_V FOREIGN KEY (MA_VOUCHER) REFERENCES VOUCHER(MA_VOUCHER)
);

CREATE TABLE HOP_DONG_QUANG_CAO (
	MAKH INT,
	STT INT,
	HINH_ANH_QC VARCHAR(500),
	TG_BAT_DAU DATE,
	TG_KET_THUC DATE,
	VI_TRI INT,
	CHI_PHI NUMERIC,
	LINK_WEBSITE VARCHAR(500),
	CHECK_THANH_TOAN BOOL,
	CONSTRAINT PK_HD PRIMARY KEY(MAKH, STT),
	CONSTRAINT FK_HD_KH FOREIGN KEY(MAKH) REFERENCES KHACH_HANG(MAKH)
);

CREATE TABLE DIA_CHI_KH (
	MAKH INT,
	STT INT,
	DISTRICTID TEXT NOT NULL,
	SO_NHA_DUONG TEXT NOT NULL,
	PHUONG_XA TEXT NOT NULL,
	QUAN_TP TEXT NOT NULL,
	TP_TINH TEXT NOT NULL,
	MAC_DINH BOOL DEFAULT FALSE,
	
	CONSTRAINT FK_DC_KH FOREIGN KEY(MAKH) REFERENCES KHACH_HANG(MAKH),
	CONSTRAINT PK_DIA_CHI_KH PRIMARY KEY(MAKH, STT)
);

CREATE TABLE DON_HANG (
	MADH INT PRIMARY key GENERATED ALWAYS AS IDENTITY(START WITH 500000 INCREMENT BY 1),
	MAKH INT,
	MACN INT,
	MA_VOUCHER INT,
	PHI_SAN_PHAM NUMERIC DEFAULT 0,
	PHI_VAN_CHUYEN NUMERIC DEFAULT 0,
	PHI_GIAM NUMERIC DEFAULT 0,
	HINH_THUC_THANH_TOAN TEXT,
	HINH_THUC_GIAO_HANG TEXT,
	TONG_PHI NUMERIC GENERATED ALWAYS AS (PHI_SAN_PHAM + PHI_VAN_CHUYEN - PHI_GIAM) STORED,
	TRANG_THAI text default 'WAIT FOR PAYMENT',
	THOI_GIAN timestamp default current_timestamp,
	DIEM_TICH_LUY numeric  GENERATED ALWAYS AS (0.001*PHI_SAN_PHAM - 0.001*PHI_GIAM) STORED,
	PAYMENT_TOKEN TEXT,
	ID_DIA_CHI_GIAO INT, 
	
	
	CONSTRAINT FK_DH_KH FOREIGN KEY (MAKH)  REFERENCES KHACH_HANG(MAKH),
	CONSTRAINT FK_DH_CN  FOREIGN KEY (MACN)  REFERENCES CHI_NHANH (MACN),
	CONSTRAINT FK_DH_VOUCHER FOREIGN KEY (MA_VOUCHER) REFERENCES VOUCHER(MA_VOUCHER),
	CONSTRAINT FK_DC_KH_DH FOREIGN KEY(MAKH,ID_DIA_CHI_GIAO) REFERENCES DIA_CHI_KH(MAKH,STT),
	CONSTRAINT FK_DH_THANH_TOAN FOREIGN KEY (HINH_THUC_THANH_TOAN) REFERENCES HINH_THUC_THANH_TOAN(MAHT),
	CONSTRAINT FK_DH_GIAO_HANG FOREIGN KEY  (HINH_THUC_GIAO_HANG) REFERENCES HINH_THUC_GIAO_HANG(MAHT)
);

create table LICH_SU_GIA (
	MASP INT,
	THOI_GIAN TIMESTAMP,
	DON_GIA NUMERIC,
	CONSTRAINT PK_LICH_SU PRIMARY KEY(MASP,THOI_GIAN),
	CONSTRAINT FK_LS_SP FOREIGN KEY (MASP) REFERENCES SAN_PHAM(MASP)
);
CREATE TABLE CHI_TIET_DON_HANG (
	MADH INT,
	MASP INT,
	MA_VOUCHER INT,
	SO_LUONG_MUA INT DEFAULT 1,
	GIA_PHAI_TRA INT DEFAULT 0,
	THANH_TIEN_MUA numeric GENERATED ALWAYS AS (SO_LUONG_MUA*GIA_PHAI_TRA) STORED,

	CONSTRAINT FK_CTDH_DH FOREIGN KEY (MADH) REFERENCES DON_HANG(MADH),
	CONSTRAINT FK_CTDH_SP FOREIGN KEY (MASP) REFERENCES SAN_PHAM(MASP),
	CONSTRAINT FK_CTDH_VOUCHER FOREIGN KEY (MA_VOUCHER) REFERENCES VOUCHER(MA_VOUCHER),
	CONSTRAINT PK_DH_SP PRIMARY KEY (MADH, MASP)
);

CREATE TABLE TRANG_THAI_DH (
	MADH INT,
	TRANG_THAI TEXT,
	THOI_GIAN TIMESTAMP default current_timestamp,
	CONSTRAINT PK_TRANG_THAI PRIMARY KEY (MADH, TRANG_THAI),
	CONSTRAINT FK_TRANG_THAI_DH FOREIGN KEY (MADH) REFERENCES DON_HANG(MADH)
);

CREATE TABLE CHI_TIET_NHAP_HANG (
	MAPN INT,
	MASP INT,
	SO_LUONG_NHAP INT,
	DON_GIA_NHAP NUMERIC,
	THANH_TIEN_NHAP NUMERIC GENERATED ALWAYS AS (SO_LUONG_NHAP * DON_GIA_NHAP) STORED,

	CONSTRAINT PK_CT_NHAP_HANG PRIMARY KEY(MAPN, MASP),	
	CONSTRAINT FK_CTNH_PN FOREIGN KEY(MAPN) REFERENCES PHIEU_NHAP_HANG(MAPN),
	CONSTRAINT FK_CTNH_SP FOREIGN KEY(MASP) REFERENCES SAN_PHAM(MASP)
);
CREATE TABLE KHO (
	MASP INT,
	MACN INT,
	SO_LUONG_TON INT DEFAULT 0,
	SO_LUONG_DA_BAN INT DEFAULT 0,

	CONSTRAINT PK_BAN PRIMARY KEY(MASP, MACN),
	CONSTRAINT FK_BAN_SP FOREIGN KEY(MASP) REFERENCES SAN_PHAM (MASP),
	CONSTRAINT FK_BAN_CN FOREIGN KEY(MACN) REFERENCES CHI_NHANH (MACN)
);
CREATE TABLE DANH_GIA (
	MAKH INT,
	MASP INT,
	NOI_DUNG TEXT,
	NGAY_DANG timestamp default current_timestamp,
	SAO INT,

	CONSTRAINT FK_DG_KH FOREIGN KEY(MAKH) REFERENCES KHACH_HANG(MAKH),
	CONSTRAINT FK_DG_SP FOREIGN KEY(MASP) REFERENCES SAN_PHAM(MASP),
	CONSTRAINT PK_DANH_GIA PRIMARY KEY(MAKH, MASP)
);

CREATE TABLE STORE_ADMIN (
	MA_ADMIN INT GENERATED ALWAYS AS IDENTITY(START WITH 300 INCREMENT BY 1),
	EMAIL VARCHAR(60) NOT NULL UNIQUE,
	MAT_KHAU VARCHAR(50) NOT NULL,
	CONSTRAINT PK_ADMIN PRIMARY KEY(MA_ADMIN)
);


--Thời gian bắt đầu áp dụng và kết thúc của voucher
ALTER TABLE VOUCHER
ADD CONSTRAINT TG_SU_DUNG_VOUCHER CHECK(TG_KET_THUC > TG_BAT_DAU);

--=================================================
CREATE FUNCTION insert_new_item_to_inventory() RETURNS TRIGGER AS
$BODY$
begin
    
	 INSERT into kho (MASP,MACN)
        select new.masp, macn
        from chi_nhanh cn;
           RETURN new;
END;
$BODY$
language plpgsql;

create TRIGGER tao_san_pham_moi
     AFTER INSERT ON SAN_PHAM
     FOR EACH ROW
     EXECUTE PROCEDURE insert_new_item_to_inventory();
--=======================================================
CREATE FUNCTION func_update_tong_san_pham() RETURNS TRIGGER AS
$BODY$
begin
    
	 update san_pham sp
	 set tong_da_ban = tong_da_ban + new.so_luong_da_ban - old.so_luong_da_ban
	 where sp.masp = new.masp;
           RETURN new;
END;
$BODY$
language plpgsql;

create TRIGGER trig_update_tong_san_pham
     AFTER UPDATE ON kho
     FOR EACH ROW
     EXECUTE PROCEDURE func_update_tong_san_pham();

CREATE FUNCTION function_add_comment() RETURNS TRIGGER AS
$BODY$
BEGIN
    UPDATE san_pham sp
    set luot_danh_gia = luot_danh_gia + 1,
    	sao = (select avg(sao) from danh_gia dg where dg.masp = new.masp group by dg.masp) 
    where sp.masp  = new.masp;
    RETURN null;
END;
$BODY$
language plpgsql;

create TRIGGER trig_add_comment
     AFTER INSERT ON danh_gia
     FOR EACH ROW
     EXECUTE PROCEDURE function_add_comment();

CREATE OR REPLACE FUNCTION convertTVkdau (x text) RETURNS text AS
$$
DECLARE
 cdau text; kdau text; r text;
BEGIN
 cdau = 'áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ';
 kdau = 'aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY';
 r = x;
 FOR i IN 0..length(cdau)
 LOOP
 r = replace(r, substr(cdau,i,1), substr(kdau,i,1));
 END LOOP;
 RETURN r;
END;
$$ LANGUAGE plpgsql;
--=====================
CREATE FUNCTION function_copy_trang_thai() RETURNS TRIGGER AS
$BODY$
begin
	case
		when (new.payment_token is null)  then
	    INSERT INTO
	        trang_thai_dh (madh,trang_thai)
	        VALUES(new.madh,new.trang_thai);
	    else null;
	end case;
	RETURN null;
END;
$BODY$
language plpgsql;

create TRIGGER trig_copy_don_hang
     AFTER INSERT OR UPDATE ON DON_HANG
     FOR EACH ROW
     EXECUTE PROCEDURE function_copy_trang_thai();

CREATE FUNCTION update_diem_tich_luy() RETURNS TRIGGER AS
$BODY$
begin
	case
		when (new.trang_thai = 'ĐÃ GIAO THÀNH CÔNG' or new.trang_thai = 'ĐÃ GIAO')  then
				with chi_tiet as(
			   		select * 
			   		from chi_tiet_don_hang ctdh 
			   		where new.madh = ctdh.madh 
			   ), 
			   step2 as(
				    UPDATE khach_hang as kh
				    set tong_diem_tich_luy = tong_diem_tich_luy + new.diem_tich_luy,
				   		tong_so_don_da_mua = tong_so_don_da_mua + 1
				    where kh.makh = new.makh
				   	returning *
				)
			 	-- step 3
			   UPDATE kho 
			    set so_luong_da_ban = so_luong_da_ban + (select so_luong_mua from chi_tiet ct where kho.masp = ct.masp)
			    where kho.macn = new.macn
			    and kho.masp in (select masp from chi_tiet);
		when new.trang_thai = 'THANH TOÁN THẤT BẠI' then 
				UPDATE khach_hang as kh
			    set tong_so_don_da_huy = tong_so_don_da_huy + 1
			    where kh.makh = new.makh;
		when new.trang_thai = 'ĐÃ XÁC NHẬN' then 
				with chi_tiet as(
			   		select * 
			   		from chi_tiet_don_hang ctdh 
			   		where new.madh = ctdh.madh 
			    ),step1 as(
					UPDATE kho 
				    set so_luong_ton = so_luong_ton - (select so_luong_mua from chi_tiet ct where kho.masp = ct.masp)
				    where kho.macn = new.macn
				    and kho.masp in (select masp from chi_tiet)
				    returning *
			    )
			    update voucher v
			    set so_luong_voucher = so_luong_voucher - 1
			    where v.ma_voucher = new.ma_voucher;
		
		when ((new.trang_thai = 'HỦY ĐƠN HÀNG' or new.trang_thai = 'ĐÃ HỦY')
		and (old.trang_thai = 'ĐÃ XÁC NHẬN' or old.trang_thai = 'ĐANG GIAO')) then 
				with chi_tiet as(
				   		select * 
				   		from chi_tiet_don_hang ctdh 
				   		where new.madh = ctdh.madh 
				 ), step2 as (
					UPDATE kho 
				    set so_luong_ton = so_luong_ton + (select so_luong_mua from chi_tiet ct where kho.masp = ct.masp)
				    where kho.macn = new.macn
				    and kho.masp in (select masp from chi_tiet)
				    returning *
				), step3 as(
					UPDATE khach_hang as kh
				    set tong_so_don_da_huy = tong_so_don_da_huy + 1
				    where kh.makh = new.makh
				   	returning *
				)
				update voucher v
			    set so_luong_voucher = so_luong_voucher + 1
			    where v.ma_voucher = new.ma_voucher;
		
		else null;
	end case;

    RETURN null;
END;
$BODY$
language plpgsql;

create TRIGGER trig_update_diem_tich_luy_don_hang
     AFTER INSERT OR UPDATE ON DON_HANG
     FOR EACH ROW
     EXECUTE PROCEDURE update_diem_tich_luy();
CREATE FUNCTION function_update_kho_nhap_hang() RETURNS TRIGGER AS
$BODY$
BEGIN
    UPDATE kho 
    set so_luong_ton = so_luong_ton + new.so_luong_nhap
    where kho.masp  = new.masp 
    and kho.macn =  (select pn.macn from phieu_nhap_hang pn where pn.mapn = new.mapn);
    RETURN null;
END;
$BODY$
language plpgsql;

create TRIGGER trig_update_kho_nhap_hang
     AFTER INSERT ON chi_tiet_nhap_hang
     FOR EACH ROW
     EXECUTE PROCEDURE function_update_kho_nhap_hang();
    
        
--==============================================
--CREATE USER ngoc_dieu WITH PASSWORD '20010714';
--GRANT select, insert, update, delete  ON ALL TABLES IN SCHEMA public TO dev_acc;
--GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO dev_acc;
--
--CREATE USER linh_le WITH PASSWORD '20010916';
--GRANT select, insert, update, delete  ON ALL TABLES IN SCHEMA public TO dev_acc;
--GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO dev_acc;
--
--CREATE USER dong_phan WITH PASSWORD '200107712';
--GRANT select, insert, update, delete  ON ALL TABLES IN SCHEMA public TO dev_acc;
--GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO dev_acc;


