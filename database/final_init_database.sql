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
	PHAN_LOAI INT,
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
	NGAY_DANG timestamp,
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



-- 1, 1
INSERT INTO CAP_BAC (LOAI_CAP_BAC, PHAN_TRAM_GIAM_GIA) 
VALUES 
('New', 0),
('Normal', 10), 
('VIP Gold', 20), 
('VIP Diamond', 40);

INSERT INTO HINH_THUC_THANH_TOAN (MAHT, TEN_HINH_THUC) 
VALUES 
('COD',   'THANH TOÁN BẰNG TIỀN MẶT'),
('MOMO',  'THANH TOÁN BẰNG VÍ ĐIỆN TỬ MOMO'), 
('PAYPAL','THANH TOÁN BẰNG VÍ ĐIỆN TỬ PAYPAL'),
('VNPAY'    ,'THANH TOÁN BẰNG THẺ QUỐC TẾ');

INSERT INTO HINH_THUC_GIAO_HANG(MAHT, TEN_HINH_THUC) 
VALUES 
('GHN',   'GIAO HANG NHANH'),
('GHTK_NORM',  'GIAO HANG TIET KIEM THUONG'), 
('GHTK_FAST','GIAO HANG TIET KIEM FAST');

-- 1000000, 1
INSERT INTO KHACH_HANG (MA_CAP_BAC, TENKH, EMAIL_KH, SDT_KH, TONG_DIEM_TICH_LUY, MAT_KHAU, ACTIVATE) 
VALUES 
(1, N'Nguyễn Thị Ngọc Diệu', 'ntnd1@gmail.com',    '0857916579', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(3, N'Lê Thị Phương Linh', 'ltpl2@gmail.com',      '0857916578', 1609, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Phan Khải Đông', 'pkd3@gmail.com',           '0857916577', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(2, N'Bùi Đăng Khoa', 'bdk4@gmail.com',            '0857916576', 329, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Tống Thảo Nhi', 'ttn5@gmail.com',            '0857916575', 67, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Nguyễn Thị Bích Phương', 'ntbp6@gmail.com',  '0857916574', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Trần Thị Lan Anh', 'ttla7@gmail.com',        '0857916573', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(3, N'Nguyễn Như Ngọc', 'nnn8@gmail.com',          '0857916572', 1654, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Nguyễn Phạm Mỹ Duyên', 'npmd9@gmail.com',    '0157916571', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Huỳnh Nguyễn Thùy Nhiên', 'hntn10@gmail.com','0557916570', 49, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(2, N'Nguyễn Quang Trường', 'nqt11@gmail.com',     '0857916599', 765, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Hà Đức Trọng', 'hdt12@gmail.com',            '0857916589', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(2, N'Trương Nguyên Thảo', 'tnt13@gmail.com',      '0957916579', 652, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Nguyễn Tuyết Anh', 'nta14@gmail.com',        '0457916569', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Lê Thị Tú Loan', 'lttl15@gmail.com',         '0857916559', 102, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Nguyễn Lê Tuấn Minh', 'nltm16@gmail.com',       '0817916539', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(2, N'Võ Quang Duy', 'vqd17@gmail.com',               '0837916519', 498, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(1, N'Trương Nguyễn Thảo Nguyên', 'nttn18@gmail.com', '0847916529', 123, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(1, N'Nguyễn Thị Thanh An', 'ntta19@gmail.com',       '0857918579', 46, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(2, N'Nguyễn Thị Hoài Linh', 'nthl20@gmail.com',      '0867916779', 549, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(3, N'Phan Quang Hiếu', 'pqh21@gmail.com',            '0877916549', 1221, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(1, N'Võ Như Quỳnh', 'vnq22@gmail.com',               '0887916569', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(1, N'Huỳnh Thục Quyên', 'htq23@gmail.com',           '0807916579', 53, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(1, N'Lê Vũ Thảo Hiền', 'lvth24@gmail.com',           '0815916579', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(1, N'Nguyễn Bá Quân', 'nbq25@gmail.com',             '0852916579', 46, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Trần Vương Quỳnh Trân', 'tvqt26@gmail.com',     '0858916579', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(1, N'Nguyễn Minh Thảo', 'nmt28@gmail.com',           '0850916789', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(2, N'Nguyễn Trung Anh', 'nta29@gmail.com',           '0851916519', 345, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Nguyễn Thị Kim Anh', 'ntka30@gmail.com',        '0857116579', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Huỳnh Thị Hồng Phấn', 'hthp31@gmail.com',       '0157952579', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Bùi Thị Kim Ngân', 'btkn32@gmail.com',          '0757916579', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(1, N'Phan Tường Vy', 'ptv33@gmail.com',              '0957918879', 0, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', true),
(2, N'Nguyễn Thương Thương', 'ntt34@gmail.com',       '0857926879', 323, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false),
(1, N'Lê Thị Minh Tuyền', 'ltmt35@gmail.com',         '0867116579', 23, '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=', false);

-- 1000, 1
INSERT INTO NHA_PHAN_PHOI (TEN_NPP, SO_NHA_DUONG, PHUONG_XA, QUAN_TP, TP_TINH) 
VALUES 
('ROYAL CANIN', N'725 Nguyễn Tất Thành', N'3', N'2', N'HCM'),
('ZENITH', N'87 Bùi Thị Xuân', N'4', N'12', N'HCM'),
('ORIGI-7', N'35 Nguyễn Huệ', N'2', N'5', N'HCM'),
('INABA', N'123 CMT8', N'1', N'3', N'HCM'),
('VEGEBRAND', N'198 Nam Kỳ Khời Nghĩa', N'Bình Thuận', N'6', N'Đồng Nai'),
('WHISKAS', N'77 Lê Văn Lương', N'Phú Mỹ', N'9', N'HCM'),
('IRIS OHYAMA', N'225 Bùi Thị Xuân', N'4', N'1', N'HCM'),
('CIAO', N'49 Đồng Khởi', N'3', N'4', N'HCM'),
('JERHIGH', N'351 Nguyễn Văn Cừ', N'8', N'8', N'Hà Nội'),

('PETISMILE', N'167 Nguyễn Văn Quỳ', N'10', N'7', N'Hải Phòng'),
('BOBBYPET', N'29 Cống Quỳnh', N'Tân Phong', N'2', N'Lâm Đồng'),
('PAW', N'214 Hai Bà Trưng', N'7', N'9', N'Hà Nội'),
('AIMIGOU', N'987 Hoàng Hoa Thám', N'5', N'12', N'HCM'),
('AUPET', N'165 Đinh Tiên Hoàng', N'Tân Hưng', N'11', N'Vĩnh Long'),
('XINDING', N'324 Nguyễn Tất Thành', N'9', N'Bình Thạnh', N'HCM'),
('ELITE', N'595 Huỳnh Tấn Phát', N'3', N'Gò Vấp', N'Hà Nội'),

('DELE', N'64 Dương Bá Trạc', N'1', N'Thủ Đức', N'HCM'),
('AMBABY PET', N'214 Nguyễn Văn Linh', N'4', N'2', N'Ninh Thuận'),
('ANIME', N'265 Lý Thái Tổ', N'Ninh Thuận', N'4', N'Lâm Đồng'),
('LOFFE', N'43 3/2', N'5', N'8', N'Hải Phòng'),
('PETISMILE', N'538 Phan Bội Châu', N'12', N'9', N'HCM'),
('AUGUSTPET', N'28 Nguyễn Văn Trỗi', N'6', N'11', N'HCM'),

('BOBO', N'55 Đoàn Thị Điểm', N'1', N'1', N'Hà Nội'),
('JOYU', N'234 Hàm Nghi', N'7', N'2', N'HCM'),
('JOYCE & DOLLS', N'101 Nguyễn Lương Bằng', N'10', N'3', N'HCM'),
('PET SOFT', N'179 Phạm Văn Nghị', N'11', N'5', N'HCM'),
('TRIXIE', N'412 Tô Hiến Thành', N'Tân Quy', N'7', N'Đồng Nai'),
('BAYER', N'79 Sư Vạn Hạnh', N'8', N'12', N'HCM'),
('MAKAR', N'421 Lê Hồng Phong', N'11', N'10', N'HCM'),
('VET''S BEST', N'127 Tô Hiến Thành', N'9', N'8', N'HCM');


-- 200, 1
INSERT INTO CHI_NHANH (SDT_CN, SO_NHA_DUONG, PHUONG_XA, QUAN_TP, TP_TINH,DISTRICTID) 
VALUES 
('0987654321', N'112 Bùi Thị Xuân', N'5', N'1', N'HCM','1442'),
('0987654322', N'231 Nguyễn Thị Thập', N'4', N'2', N'HCM','1443'),
('0987654323', N'64 Nam Lỳ Khởi Nghĩa', N'7', N'3', N'HCM','1444'),
('0987654324', N'256 Hoàng Hoa Thám', N'9', N'5', N'HCM','1447'),
('0987654325', N'21 Nguyễn Văn Trỗi', N'8', N'7', N'HCM','1449'),
('0987654326', N'572 An Dương Vương', N'6', N'10', N'HCM','1452'),
('0987654327', N'375 Huỳnh Tấn Phát', N'2', N'Tân Phú', N'HCM','1456'),
('0987654328', N'184 Võ Văn Kiệt', N'5', N'Bình Thạnh', N'HCM','1462'),
('0987654329', N'83 Trần Hưng Đạo', N'1', N'Tân Bình', N'HCM','1455');

--10, 1
INSERT INTO LOAI_HANG (TEN_LH) 
VALUES 
(N'Thức ăn'),
(N'Mỹ phẩm và làm đẹp'),
(N'Thời trang'),
(N'Đồ chơi'),
(N'Y tế'),
(N'Chuồng thú');


-- add voucher cho san pham
INSERT INTO VOUCHER (PHAN_TRAM_GIAM_GIA, GIAM_TOI_DA, TG_BAT_DAU, TG_KET_THUC, PHAN_LOAI) 
values
(5, 1000, '2022-06-20 00:00:00-07', '2022-07-01 00:00:00-07', N'DH'),
(7, 100, '2022-06-25 00:00:00-07', '2022-07-01 00:00:00-07', N'DH'),
(5, 500, '2022-06-30 00:00:00-07', '2022-07-20 00:00:00-07', N'DH'),
(10, 10000, '2022-07-30 00:00:00', '2022-09-30 00:00:00', 'DH'),
(5, 10000, '2022-07-30 00:00:00', '2022-09-30 00:00:00', 'DH'),
(15, 12000, '2022-07-30 00:00:00', '2022-08-30 00:00:00', 'DH'),
(20, 20000, '2022-07-30 00:00:00', '2022-08-30 00:00:00', 'DH'),
(10, 500, '2022-07-01 00:00:00-07', '2022-07-10 00:00:00-07', N'SP'),
(20, 500, '2022-07-05 00:00:00-07', '2022-07-31 00:00:00-07', N'SP'),

(5, 100000, '2022-07-30 00:00:00', '2022-09-30 00:00:00', 'SP'),
(7, 100000, '2022-07-30 00:00:00', '2022-09-30 00:00:00', 'SP'),
(10, 100000, '2022-07-30 00:00:00', '2022-09-30 00:00:00', 'SP'),
(12, 100000, '2022-07-30 00:00:00', '2022-09-30 00:00:00', 'SP'),
(15, 100000, '2022-07-30 00:00:00', '2022-09-30 00:00:00', 'SP'),
(20, 100000, '2022-07-30 00:00:00', '2022-09-30 00:00:00', 'SP');


--200000, 1
INSERT INTO SAN_PHAM (MALH, MANPP, TEN_SP, HINH_ANH, MO_TA, KHOI_LUONG, GIA_BAN) 
VALUES 
(10, 1000, N'Thức ăn cho chó Poodle con ROYAL CANIN Poodle Puppy', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065285/food/thuc-an-cho-cho-poodle-con-royal-canin-poodle-puppy1_j0i9m3.webp', N'Thức ăn cho chó Poodle  con ROYAL CANIN  Poodle Puppy dành riêng cho tất cả các giống chó Teacup, Tiny Poodle, Toy Poodle, Standard Poodle dưới 10 tháng tuổi', 500, 155000),
(10, 1000, N'Thức ăn cho chó con cỡ nhỏ ROYAL CANIN Mini Puppy', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065284/food/thuc-an-cho-cho-con-co-nho-royal-canin-mini-puppy1_lupyrd.webp', N'Thức ăn cho chó con cỡ nhỏ ROYAL CANIN Mini Puppy dành cho các giống chó con dưới 10 tháng tuổi. Với công thức đặc chế riêng cho nhu cầu dinh dưỡng của chó con thuộc các giống cỡ nhỏ. Thức ăn cho chó con (các giống chó cỡ nhỏ) được nghiên cứu để cung cấp dinh dưỡng theo nhu cầu thực tế của chó con. Duy trì sức đề kháng cho chó con: chất chống oxy hóa CELT. Hỗ trợ hệ tiêu hóa hoạt động ổn định: L.I.P, đường FOS. Cung cấp dinh dưỡng toàn diện cho chó: chế biến theo công thức cung cấp năng lượng cao', 800, 185000),
(10, 1000, N'Thức ăn cho mèo trưởng thành ROYAL CANIN Regular Fit 32', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065286/food/thuc-an-cho-meo-truong-thanh-royal-canin-regular-fit-321_pvctbz.webp', N'Thức ăn cho mèo  trưởng thành ROYAL CANIN  Regular Fit 32 dành cho tất cả các giống mèo trưởng thành từ 12 tháng tuổi trở lên. Sản phẩm giúp duy trì thể trạng khỏe mạnh cho mèo. Duy trì cân nặng ổn định. Đảm bảo hệ tiêu hóa cân bằng. Hỗ trợ hệ tiết niệu khỏe mạnh. Xenlulozơ: kích thích tiêu hóa, tăng khả năng hấp thu chất dinh dưỡng. Albumin: thành phần quan trọng nhất cấu tạo nên nhiều cơ quan trong cơ thể', 400, 95000),
(10, 1000, N'Thức ăn cho mèo trưởng thành ROYAL CANIN Indoor 27', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065285/food/thuc-an-cho-meo-truong-thanh-royal-canin-indoor-27_xx1kmt.webp', N'Thức ăn cho mèo  trưởng thành ROYAL CANIN  Indoor 27 dành cho tất cả giống mèo sống trong nhà trên 12 tháng (Royal Canin Adult 1 tuổi).', 400, 105000),
(10, 1000, N'Thức ăn cho chó trưởng thành cỡ vừa ROYAL CANIN Medium Adult', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065285/food/thuc-an-cho-cho-truong-thanh-royal-canin-medium-adult1_jouft7.webp', N'Thức ăn cho chó trưởng thành cỡ vừa ROYAL CANIN Medium Adult dành cho những chú chó trưởng thành 12 tháng tuổi trở lên. Với công thức đặc chế riêng cho nhu cầu dinh dưỡng của chó trưởng thành.', 1000, 155000),
(10, 1001, N'Thức ăn cho mèo giúp loại bỏ búi lông ZENITH Cat Hairball', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065286/food/zenith-cat-hairball_rkcc6z.webp', N'Thức ăn cho mèo  giúp loại bỏ búi lông ZENITH  Cat Hairball được chế biến từ thịt cá hồi, thịt nạc gà rút xương, gạo lứt, yến mạch và bột rong biển giúp đào thải búi lông. Với các thành phần tươi sạch, giàu dinh dưỡng. Thức ăn cho mèo giúp loại bỏ búi lông ZENITH Cat Hairball hạt mềm, cung cấp độ ẩm cao và lượng muối thấp, thơm ngon, dễ nhai, dễ tiêu hóa và tốt cho sức khỏe của mèo.', 1200, 230000),
(10, 1000, N'Thức ăn cho mèo dưỡng đẹp lông ROYAL CANIN Hair & Skin', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065285/food/thuc-an-cho-meo-duong-dep-long-royal-canin-hair-skin1_lqrbhs.webp', N'Thức ăn cho mèo  dưỡng đẹp lông ROYAL CANIN  Hair & Skin cho tất cả giống mèo trưởng thành từ 12 tháng tuổi trở lên. Sản phẩm được nghiên cứu dành riêng cho những giống mèo có lông dày. \nĐảm bảo cung cấp đủ dinh dưỡng theo nhu cầu thực tế của mèo. Albumin là thành phần quan trọng cấu tạo nên một số cơ quan trong cơ thể. Các axit béo thiết yếu cung cấp năng lượng, giúp lông khỏe và mượt. Khoáng chất giúp xương và da phát triển khỏe mạnh, ít bệnh.', 400, 110000),
(10, 1002, N'Thức ăn cho chó hạt mềm vị thịt bò ORIGI-7 Beef', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065285/food/thuc-an-cho-cho-hat-mem-vi-thit-bo-origi-7-beef_h9xknt.webp', N'Thức ăn cho chó hạt mềm vị thịt bò ORIGI-7  Beef được làm từ thịt bò tươi ngon, chỉ sử dụng nguồn nguyên liệu hữu cơ sạch, an toàn, cung cấp đầy đủ dinh dưỡng cho thú cưng phát triển khỏe mạnh.', 500, 250000),
(10, 1006, N'Pate cho chó hỗ trợ chức năng gan và sáng mắt IRIS Benefit For Eyes & Liver', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065287/food/pate-cho-cho-ho-tro-chuc-nang-gan-va-sang-mat-iris-benefit-for-eyes-liver_dls3ib.webp', N'Pate cho chó hỗ trợ chức năng gan và sáng mắt IRIS  Benefit For Eyes & Liver là sản phẩm dành cho tất cả giống chó. Với thành phần hoàn toàn từ tự nhiên', 500, 35000),
(10, 1006, N'Pate cho chó vị bò và rau IRIS HRBV375 Beef Vegetable', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065287/food/pate-cho-cho-vi-bo-va-rau-iris-hrbv375-beef-vegetable3_jpqe56.webp', N'Pate cho chó vị bò và rau IRIS  HRBV375 Beef Vegetable dành cho tất cả các giống chó. Bảo quản sản phẩm nơi khô ráo và thoáng mát. Thời hạn sử dụng 24 tháng kể từ ngày sản xuất', 500, 85000),
(10, 1006, N'Pate cho chó giảm rụng lông IRIS Benefit For Fur', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065286/food/pate-cho-cho-giam-rung-long-iris-benefit-for-fur_x1lpjv.webp', N'Pate cho chó giảm rụng lông IRIS  Benefit For Fur là sản phẩm dành cho tất cả giống chó. Với thành phần hoàn toàn từ tự nhiên', 500, 35000),
(10, 1003, N'Súp thưởng cho chó thơm miệng INABA WANG Oral Health', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065287/food/sup-thuong-cho-cho-thom-mieng-inaba-wang-oral-health_cdl7n2.webp', N'Súp thưởng cho chó chắc xương INABA  WANG Joint Health với thành phần Polyphenol trong trà xanh gấp 5 lần sẽ giúp cho răng miệng của chó luôn sạch sẽ, ngăn ngừa sâu răng và hôi miệng.. Sản phẩm không chứa chất bảo quản. Chó đặc biệt rất thích loại nước súp thưởng này', 500, 40000),
(10, 1003, N'Súp ăn liền cho chó vị gà và phô mai INABA WANG Chicken & Cheese', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065286/food/sup-an-lien-cho-cho-vi-ga-va-pho-mai-inaba-wang-chicken-cheese_uhppiz.webp', N'Súp ăn liền cho chó vị gà và khoai tây INABA  WANG Chicken & Potatoes với thành phần hương vị hỗn hợp chất lượng cao đã được say nhuyễn. Có thể thưởng cho chó ăn vặt trực tiếp hoặc trộn cùng với thức ăn khác. Sản phẩm không chứa chất bảo quản. Chó đặc biệt rất thích loại nước súp thưởng này', 500, 40000),
(10, 1004, N'Bánh thưởng cho chó vị thịt bò VEGEBRAND Orgo Freshening Biscuit Bacon Beef', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065287/food/banh-thuong-cho-cho-vi-thit-bo-vegebrand-orgo-freshening-biscuit-bacon-beef_kbigw2.webp', N'Bánh thưởng cho chó vị thịt bò VEGEBRAND  Orgo Freshening Biscuit Bacon Beef có tác dụng làm sạch răng cho chó vị thịt bò. Sản phẩm có chứa các thành phần bạc hà tự nhiên kết hợp với hương vị thịt bò, có khả năng loại bỏ các vi khuẩn gây hôi miệng cho chú chó của bạn một cách nhanh chóng. Sản phẩm có thể kết hợp dùng để huấn luyện', 500, 25000),
(10, 1004, N'Xương gặm sạch răng cho chó VEGEBRAND Orgo Freshening Peppermint', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065287/food/pate-cho-meo-huong-vi-ca-ngu-va-cua-iris-tuna-crab_jk30fu.webp', N'Xương gặm sạch răng cho chó VEGEBRAND  Orgo Freshening Peppermint là sản phẩm dinh dưỡng dành cho chó trên 5 tháng tuổi', 500, 100000),
(10, 1005, N'Pate cho mèo vị nước sốt thịt bò WHISKAS Beef Flavour Sauce', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065289/food/pate-cho-meo-vi-nuoc-sot-thit-bo-whiskas-beef-flavour-sauce_rfdzzi.webp', N'Pate cho mèo vị nước sốt thịt bò WHISKAS  Beef Flavour Sauce, thơm ngon đặc trưng dành riêng cho mèo, giúp mèo cưng ăn uống ngon miệng hơn. Tăng miễn dịch, hỗ trợ tiêu hóa. Chăm sóc lông mềm mượt và hạn chế tối đa tỷ lệ rụng lông hàng năm của mèo cưng', 500, 25000),
(10, 1006, N'Pate cho mèo hương vị cá ngừ và cua IRIS Tuna & Crab', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065287/food/pate-cho-meo-huong-vi-ca-ngu-va-cua-iris-tuna-crab_jk30fu.webp', N'Pate cho mèo hương vị cá ngừ và cua IRIS  Tuna & Crab là thức ăn dành riêng cho tất cả giống mèo', 500, 35000),
(10, 1007, N'Súp thưởng cho mèo CIAO Tuna vị cá ngừ biển', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065286/food/sup-thuong-cho-meo-ciao-tuna-vi-ca-ngu-400x400_bggtmk.webp', N'Súp thưởng cho mèo  CIAO  Tuna vị cá ngừ biển say nhuyễn kết hợp với Polydextrose và Fructooligosaccharides có lợi cho tiêu hóa và sự hấp thụ dinh dưỡng của mèo. Có thể thưởng cho mèo ăn trực tiếp hoặc trộn cùng với thức ăn khác. Sản phẩm không chưa chất bảo quản. Mèo đặc biệt rất thích loại nước súp thưởng này', 500, 40000),
(10, 1007, N'Súp thưởng cho mèo vị cá ngừ cá chép CIAO Tuna & Bonito', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065284/food/sup-thuong-cho-meo-vi-ca-ngu-ca-chep-ciao-tuna-bonito_h9a9du.webp', N'Súp thưởng cho mèo  vị cá ngừ cá chép CIAO  Tuna & Bonito đã được say nhuyễn với hương vị thơm ngon. Soup thưởng CIAO Churu cũng giống như nước sốt pate cho mèo  có thể cho ăn trực tiếp, hoặc trộn cùng với thức ăn để giúp kích thích vị giác của mèo', 500, 175000),
(10, 1008, N'Bánh thưởng cho mèo vị cá hồi JERHIGH Jinny Salmon', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065286/food/banh-thuong-cho-meo-vi-ca-hoi-jerhigh-jinny-salmon-flavored-400x400_rvsuop.webp', N'Bánh thưởng cho mèo  vị cá hồi JERHIGH  Jinny Salmon là thức ăn phụ và cũng để thưởng cho mèo. Cung cấp năng lượng cho chú mèo của bạn. Đây cũng được coi là thức ăn phụ và để thưởng cho người bạn bốn chân của bạn', 500, 45000),

(15, 1006, N'Nhà cho chó bằng nhựa IRIS Bob House', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064414/house/nha-nhua-cho-cho-co-be-iris-09121_k7woru.webp', N'Nhà cho chó bằng nhựa IRIS  cỡ bé phù hợp với tất cả giống chó.', 2000, 175000),
(15, 1009, N'Nhà cho chó mèo hình động vật PETISMILE', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064414/house/nha-cho-meo-hinh-dong-vat-petismile_mnyq1v.webp', N'Nhà cho chó mèo hình động vật PETISMILE  là sản phẩm được dùng cho tất cả giống mèo', 2000, 985000),
(15, 1006, N'Chuồng nhựa cho chó mèo IRIS 660', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064416/house/chuong-nhua-cho-meo-iris-660_l2vhah.webp', N'Chuồng nhựa cho chó mèo IRIS 660 là sản phẩm giúp cho thú cưng của bạn cảm thấy thoải mái nhất khi ở trong. Chất liệu làm bằng nhựa ABS với độ bền cao và dễ dàng làm sạch. Sản phẩm kết hợp bánh bi di động thay đổi vị trí dễ dàng hoặc bạn có thể chốt vị trí cố định nếu bạn không muốn di chuyển thường xuyên.', 2000, 1550000),
(15, 1006, N'Quây cho chó bằng nhựa nan nhỏ AUPET Exercise Playpen', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064415/house/quay-cho-cho-bang-nhua-nan-nho-aupet-exercise-playpen_wjyggb.webp', N'Quây cho chó bằng nhựa nan nhỏ AUPET Exercise Playpen được sản xuất bởi chất liệu nhựa cao cấp PP an toàn cho thú cưng, thân thiện với môi trường, không gây độc hại.', 2000, 1550000),
(15, 1006, N'Quây cho chó bằng nhựa nan nhỏ AUPET Exercise Playpen', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064415/house/quay-cho-cho-bang-nhua-nan-nho-aupet-exercise-playpen_wjyggb.webp', N'Quây cho chó bằng nhựa nan nhỏ AUPET Exercise Playpen được sản xuất bởi chất liệu nhựa cao cấp PP an toàn cho thú cưng, thân thiện với môi trường, không gây độc hại.', 2000, 1550000),
(15, 1010, N'Đệm cho chó mèo thành cao BOBBY PET 16OB002', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064417/house/dem-cho-cho-meo-thanh-cao-bobby-pet-16ob002_htochu.webp', N'Đệm cho chó mèo thành cao BOBBY PET 16OB002 được thiết kế dành riêng cho vật nuôi. Phù hợp với tất cả các giống chó mèo.', 2000, 455000),
(15, 1010, N'Nệm cho chó mèo BOBBY PET DS14OB', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064414/house/nem-cho-cho-meo-bobby-pet-ds14ob_grmodi.jpg', N'Nệm cho chó mèo BOBBY PET DS14OB được thiết kế dành riêng cho vật nuôi. Bao gồm lớp vải mỏng bên ngoài, bên trong được cấu tạo bởi một lớp lông cừu dày và ấm áp. Chất liệu bền và dễ dàng vệ sinh sạch sẽ. Ổ đệm hình tròn có thành cao tạo cảm giác thoải mái nhất cho thú cưng khi nằm. Phần đệm dưới tạo cảm giác êm ái nằm. Cún cưng sẽ ngủ ngon giấc hơn. Là một chiếc giường lý tưởng để nghỉ ngơi sau khi vui chơi và huấn luyện. Bạn cũng có thể dễ dàng giặt sạch ổ nệm khi bị bẩn.', 2000, 455000),
(15, 1011, N'Ổ đệm cho chó mèo PAW hình con cá mập', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064414/house/o-dem-cho-cho-meo-paw-hinh-con-ca-map_izfkn9.jpg', N'Ổ đệm cho chó mèo PAW hình con cá mập với chất liệu vải nhung mềm mại, cao cấp an toàn cho thú cưng. Cho thú cưng một cảm giác êm ái khi nằm trên nệm. Với sắc xanh nổi bật. Được thiết kế cách điệu vô cùng đáng yêu. Mang tới những phút giây thư giãn và nghỉ ngơi cho thú cưng của bạn. Ổ đệm được làm từ chất liệu vải cao cấp. Bao gồm lớp vải mỏng bên ngoài, bên trong là lớp lông cừu dày, êm. Đặc biệt rất dễ để vệ sinh và làm sạch khi bẩn. Phù hợp với không gian ngôi nhà của bạn. Bạn cũng có thể thoải mái di chuyển nệm tới bất kì vị trí nào mà bạn mong muốn.', 2000, 580000),
(15, 1012, N'Nhà cây cho mèo Cat Tree QQ80349-3', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064414/house/nha-cay-cho-meo-cat-tree-qq80349-3-400x401_ojvgvo.webp', N'Nhà cây cho mèo Cat Tree QQ80349-3 hay còn gọi là cat stand, cat condo. Có thể hiểu như một ngôi nhà, một sân chơi, một phòng tập thể hình dành cho mèo yêu tận hưởng những giây phút thư giãn, giải trí.', 2000, 3500000),
(15, 1012, N'Trụ cào móng cho mèo kèm đồ chơi QQ60060B', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064415/house/tru-cao-mong-cho-meo-kem-do-choi-qq60060b_ondygn.webp', N'Trụ cào móng cho mèo  kèm đồ chơi QQ60060B được ưa chuộng tại châu Âu và nhiều quốc gia trên thế giới. Chất liệu tự nhiên, bền tốt không bị trầy xước, giúp móng mèo luôn chắc khỏe, tránh thiệt hại các vật dụng trong nhà.', 2000, 400000),
(15, 1013, N'Chuồng mèo 2 tầng nan sắt AUPET 2-Layer Cat Cage', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064416/house/chuong-meo-2-tang-nan-sat-aupet-2-layer-cat-cage5_snuy1c.webp', N'Chuồng mèo với thiết kế sang trọng có kết cấu chắc chắn đảm bảo an toàn cho thú cưng. Với lớp sơn sắt trắng bóng cao cấp chống gỉ giúp tăng độ bền và dễ dàng khi vệ sinh. Cửa trước có thể đảo ngược, giúp kiểm soát an toàn, cho mèo dễ dàng ra vào cũng như định vị một cách linh hoạt. Võng phía trên giúp mèo nghỉ ngơi và thư giãn. Chuồng mèo 2 tầng nan sắt AUPET 2-Layer Cat Cage có 5 bánh xe, 4 bánh 4 góc và 1 bánh ở giữa dễ dàng di chuyển theo ý muốn.', 2000, 2800000),
(15, 1012, N'Nhà cây cho mèo Cat Tree QQ80862', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064414/house/nha-cay-cho-meo-cat-tree-qq80862_k5frpx.webp', N'Nhà cây cho mèo Cat Tree QQ80862 đơn giản mà tinh tế với chân đế vững chắc. Phù hợp với tất cả các giống mèo ở các lứa tuổi khác nhau. Sản phẩm có thể tháo lắp để vệ sinh dễ dàng, tiện lợi.', 2000, 1800000),
(15, 1014, N'Nhà nhựa cho chó có cửa sổ trời XINDING 419A', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064414/house/nha-cho-cho-bang-nhua-dang-cao-xinding-419a-2_v4id4b.webp', N'Nhà nhựa cho chó có cửa sổ trời XINDING  419A là sản phẩm dành cho tất cả giống chó.', 2000, 3080000),
(15, 1010, N'Ổ đệm cho chó mèo hình lều BOBBY PET 16CT001', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064415/house/o-dem-cho-cho-meo-hinh-leu-bobby-pet-16ct001_nxcqao.webp', N'Ổ đệm cho chó mèo hình lều BOBBY PET 16CT001 được thiết kế dành riêng cho vật nuôi. Phù hợp với tất cả các giống chó mèo.', 2000, 495000),
(15, 1015, N'Ổ đệm cho chó mèo vải họa tiết động vật ELITE', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064415/house/o-dem-cho-cho-meo-vai-hoa-tiet-dong-vat-elite_wpuhjf.webp', N'Ổ đệm cho chó mèo vải họa tiết động vật ELITE  với thiết kế hình nôi độc đáo và ấm áp. Phù hợp với tất cả các giống chó mèo khác nhau.', 2000, 395000),
(15, 1010, N'Thảm cho chó mèo nằm loại dày BOBBY PET DS14RC', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656064415/house/tham-cho-cho-meo-nam-loai-day-bobby-pet-ds14rc_grgnc7.jpg', N'Thảm cho chó mèo nằm loại dày BOBBY PET DS14RC được thiết kế dành riêng cho vật nuôi nằm. Bao gồm lớp vải mỏng bên ngoài, bên trong được cấu tạo bởi một lớp lông cừu dày & ấm áp, chất liệu bền và dễ dàng vệ sinh sạch sẽ. Thảm nằm hình chữ nhật giúp cún cưng có thể nằm thoải mái với đủ các tư thế nằm khác nhau. Một chiếc giường êm ái sẽ giúp thú cưng thư giãn sau khi vận động và tham gia huấn luyện. Có thể vệ sinh dễ dàng khi bẩn.', 2000, 655000),

(12, 1017, N'Quần áo cho chó mèo AMBABY PET 2JXF216', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066666/fashion/quan-ao-cho-cho-meo-ambaby-pet-2jxf216_kkudai.webp', N'Sản phẩm được thiết kế với chất liệu cotton và gia công tỉ mỉ, Kiểu dáng dễ mặc, dễ vận động đem đến sự thoải mái cho chó mèo', 500, 180000),
(12, 1017, N'Quần áo cho chó mèo AMBABY PET 2JXF164', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066666/fashion/quan-ao-cho-cho-meo-ambaby-pet-2jxf164_gtegje.webp', N'Sản phẩm được thiết kế với chất liệu cotton và gia công tỉ mỉ, Kiểu dáng dễ mặc, dễ vận động đem đến sự thoải mái cho chó mèo', 500, 245000),
(12, 1017, N'Yếm cho chó mèo kèm dây dắt AMBABY PET 1JXS058', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066665/fashion/yem-cho-cho-meo-kem-day-dat-ambaby-pet-1jxs058-400x400_f1xuav.webp', N'Chất liệu vải cao cấp tuyệt đối không ảnh hưởng đến sức khỏe của chó mèo, Thú cưng của bạn sẽ được chú ý, thu hút từ ánh mắt của mọi người', 500, 255000),
(12, 1017, N'Vòng cổ cho chó mèo kèm dây dắt AMBABY PET 1JXS041', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066665/fashion/vong-co-cho-cho-meo-kem-day-dat-ambaby-pet-1jxs041-400x400_iz8vcp.webp', N'Vòng cổ cho chó mèo kèm dây dắt AMBABY PET  1JXS041 là sản phẩm dùng cho tất cả giống chó và mèo theo từng kích cỡ phù hợp.', 500, 225000),
(12, 1017, N'Yếm cho chó mèo kèm dây dắt AMBABY PET 1JXS015', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066665/fashion/yem-cho-cho-meo-kem-day-dat-ambaby-pet-1jxs015-400x400_chvxaq.webp', N'Yếm cho chó mèo kèm dây dắt AMBABY PET  1JXS015 là sản phẩm dành cho tất cả giống chó và mèo', 500, 255000),
(12, 1016, N'Dây dắt chó mèo đi dạo tự cuốn DELE 009 Retractable Leash', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066666/fashion/dat-cho-meo-di-dao-tu-cuon-dele-009-retractable-leash_ygyt39.webp', N'Dây dắt chó mèo đi dạo tự cuốn DELE  009 Retractable Leash là sản phẩm phù hợp cho những giống chó dưới 40kg.', 500, 175000),
(12, 1011, N'Vòng cổ cho chó cỡ nhỏ PAW bằng da đính cườm cao cấp', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066665/fashion/vong-co-cho-cho-co-nho-paw-bang-da-dinh-cuom-cao-cap_wizvbg.jpg', N'Vòng cổ cho chó cỡ nhỏ PAW  bằng da đính cườm cao cấp là sản phẩm dành cho tất cả giống chó cỡ nhỏ.', 500, 170000),
(12, 1017, N'Quần áo cho chó mèo AMBABY PET 2JXF112', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066666/fashion/quan-ao-cho-cho-meo-ambaby-pet-2jxf112-400x400_uco26a.webp', N'Sản phẩm được thiết kế với chất liệu cotton và gia công tỉ mỉ, Kiểu dáng dễ mặc, dễ vận động đem đến sự thoải mái cho chó mèo', 500, 245000),
(12, 1018, N'Túi đựng chó mèo ANIME hình họa tiết White Cats', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066666/fashion/tui-dung-cho-meo-anime-hinh-hoa-tiet-white-cats_opl5r7.webp', N'Chất liệu túi không thấm nước và dễ làm vệ sinh làm sạch. Dễ dàng tháo gấp gọn lại khi cần', 500, 300000),
(12, 1009, N'Balo đựng chó mèo PETISMILE Dis78 Favorite Space', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066666/fashion/balo-dung-cho-meo-petismile-dis78-favorite-space-400x401_ewacp7.webp', N'Chất liệu túi không thấm nước và dễ làm vệ sinh làm sạch. Dễ dàng tháo gấp gọn lại khi cần', 500, 995000),
(12, 1018, N'Túi đựng chó mèo ANIME nhựa trong', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066666/fashion/tui-dung-cho-meo-anime-nhua-trong-400x400_wgxyvw.webp', N'Chất liệu túi không thấm nước và dễ làm vệ sinh làm sạch. Dễ dàng tháo gấp gọn lại khi cần', 500, 300000),
(12, 1019, N'Balo đựng chó mèo phi hành gia LOFFE Panoramic', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066666/fashion/balo-dung-cho-meo-phi-hanh-gia-loffe-panoramic-400x400_te3idw.webp', N'Sản phẩm được tích hợp dây xích an toàn, tấm lưới lỗ thông gió, lót mềm mại tạo cho thú cưng cảm giác thoải mái, tiện lợi và an toàn.', 500, 525000),
(12, 1011, N'Rọ mõm cho chó mõm ngắn PAW', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066666/fashion/ro-mom-cho-cho-mom-ngan-paw-nhieu-kich-co_p48m4a.jpg', N'Rọ mõm cho chó mõm ngắn PAW  nhiều kích cỡ phù hợp cho các giống chó: Pug, Bull Pháp, Bull Anh, Boxer, Bắc Kinh, Nhật…', 500, 230000),
(12, 1011, N'Vòng cổ chống liếm cho chó mèo PAW Pet Elizabethan Collar', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066945/fashion/vong-co-chong-liem-cho-cho-meo-paw-pet-elizabethan-collar-400x400_erefyg.webp', N'Vòng cổ chống liếm cho chó mèo PAW Pet Elizabethan Collar hay còn gọi là vòng xấu hổ với chất liệu nhựa mềm nhập khẩu, an toàn, kiên cố, thiết kế hiện đại không gây tổn thương cho cơ thể của thú cưng. Tác dụng chính của sản phẩm: Chống thú cưng liếm vào cơ thể khi bôi thuốc và dễ dàng tắm, cắt tỉa lông và làm đẹp cho thú cưng. Sản phẩm dùng được cho tất cả các giống chó mèo. Lưu ý khi lựa chọn size phù hợp cho thú cưng: Bạn cần phải đo đúng kích thước vòng cổ của thú cưng, sau đó đo độ dài từ cổ đến miệng đồng thời kiểm tra kích thước chiều sâu.  Kích thước của các số từ 1 đến 7 chỉ là để tham khảo, vui lòng xem và thử trực tiếp tại cửa hàng.', 500, 50000),
(12, 1021, N'Địu chó mèo AUGUST PET P68027B', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656066665/fashion/diu-cho-meo-august-pet-p68027b-400x400_vuypul.webp', N'Địu chó mèo AUGUST PET P68027B được làm từ chất liệu vải cao cấp cực kì chắc chắn. Được dùng cho tất cả giống chó và mèo.', 500, 250000),

(13, 1015, N'Đồ chơi cho chó kêu chút chít bằng cao su ELITE hình thú', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067857/toys/do-choi-cho-cho-keu-chut-chit-bang-cao-su-elite-hinh-thu_gnb8ve.webp', N'Sản phẩm có kích thước nhỏ gọn, màu sắc như thật, âm thanh chút chít đáng yêu sẽ khiến cho cún cưng không cảm thấy cô đơn khi ở nhà một mình.', 500, 50000),
(13, 1015, N'Đồ chơi cho chó kêu chút chít bằng cao su ELITE hình con hươu', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067857/toys/do-choi-cho-cho-keu-chut-chit-bang-cao-su-elite-hinh-con-huou_k67gpp.webp', N'Đồ chơi cho chó kêu chút chít bằng cao su ELITE hình con hươu ngăn ngừa thói quen cắn phá của cún con. Tránh chó cưng sủa, làm rách đồ đạc và chán ăn.', 500, 50000),
(13, 1015, N'Đồ chơi cho chó mèo kêu chút chít ELITE hình thú bông', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067857/toys/do-choi-cho-cho-meo-keu-chut-chit-elite-hinh-thu-bong-400x400_s8b79n.webp', N'Là món đồ giúp thú cưng ở trong nhà mà không cảm thấy nhàm chán khi bị bỏ lại một mình. Món đồ chơi đặc biệt dễ thương này không chỉ giúp chú chó giải trí mà còn bảo vệ những thứ quan trọng cho bạn như giày dép, bàn ghế, tủ…', 500, 105000),
(13, 1015, N'Đồ chơi cho chó kêu chút chít ELITE hình thú ôm dây thừng', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067857/toys/do-choi-cho-cho-keu-chut-chit-elite-hinh-thu-om-day-thung_kdbpx9.webp', N'Thiết kế âm thanh, thiết bị âm thanh tích hợp, đồ chơi sẽ phát ra âm thanh khi chơi, tăng thêm niềm vui cho cún cưng.', 500, 50000),
(13, 1011, N'Đồ chơi dây thừng cho chó mèo PAW loại dài', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067858/toys/do-choi-day-thung-cho-cho-meo-paw-loai-dai_azeg26.webp', N'Sản phẩm giúp hạn chế nhu cầu gặm phá đồ đạc của thú cưng trong gia đình.', 500, 50000),
(13, 1011, N'Đồ chơi cần câu cho mèo PAW vui nhộn', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067858/toys/do-choi-can-cau-cho-meo-paw_thxqki.webp', N'Đồ chơi cần câu cho mèo PAW có thể hỗ trợ chú mèo tích cực tập thể dục mỗi ngày, không chỉ tăng cường mối quan hệ với chủ nhân mà còn duy trì một cơ thể hoàn hảo, tránh việc thiếu vận động trong nhà dẫn đến béo phì. Ưu điểm của cần câu mèo này là dây thép dẻo dai, siêu bền, bạn có thể lắc đi lắc lại, như một con cim lông vũ bay trên trời, sẽ gợi nhớ đến ký ức đuổi bắt các loại chim trong thế giới tự nhiên, khiến mèo cảm thấy vui vẻ.', 500, 75000),
(13, 1015, N'Đồ chơi cho chó mèo bằng bông chút chít ELITE hình tuần lộc', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067858/toys/do-choi-cho-cho-meo-bang-bong-chut-chit-elite-hinh-tuan-loc-400x400_rtcyxs.webp', N'Là món đồ giúp thú cưng ở trong nhà mà không cảm thấy nhàm chán khi bị bỏ lại một mình. Món đồ chơi đặc biệt dễ thương này không chỉ giúp chú chó giải trí mà còn bảo vệ những thứ quan trọng cho bạn như giày dép, bàn ghế, tủ…', 500, 135000),
(13, 1011, N'Đồ chơi mèo bằng cói PAW hình cá size XL', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067858/toys/do-choi-meo-bang-coi-paw-hinh-ca-size-xl_tiirwv.webp', N'Đồ chơi mèo bằng cói PAW hình cá size XL với chất liệu bằng cói tự nhiên rất an toàn và không gây độc hại. Không những chỉ có tính năng làm đồ chơi, sản phẩm còn giúp mèo của bạn trở nên hoạt bát hơn, năng động hơn. Đồng thời còn có tác dụng để kích thích và định hướng mèo cào mài móng của mình, tránh làm hỏng hóc các đồ vật trong nhà. Đặc biệt nó còn gây tiếng động có tác dụng kích thích sự tò mò tự nhiên của mèo, giúp phát triển toàn diện hơn.', 500, 150000),
(13, 1011, N'Đồ chơi cho chó bằng cao su hình xương PAW', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067858/toys/do-choi-cho-cho-bang-cao-su-soleil-co-gai-hinh-ban-chan_efxebz.webp', N'Sản phẩm đồ chơi cho chó được thiết kế với nhiều hình dáng khác nhau và đặc biệt được thiết kế với chức năng làm sạch răng cho chó khi chúng gặm, cắn sản phẩm.', 500, 75000),
(13, 1011, N'Đồ chơi cho chó bằng cao su PAW có gai hình bàn chân', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067858/toys/do-choi-cho-cho-hinh-xuong-cao-su-soleil-rubber-dog-toy-small-solid-bone_hciuhm.webp', N'Đồ chơi cho chó với chất liều bằng cao su cao cấp tự nhiên, không gây độc hại cho chó. Có độ bền cao và khả năng đàn hồi tốt.', 500, 55000),
(13, 1022, N'Đồ chơi cho mèo BOBO BO4804', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067857/toys/do-choi-cho-meo-bobo-bo4804_rq79jb.webp', N'Đồ chơi cho mèo BOBO BO4804 với chất liệu bằng cói tự nhiên rất an toàn và không gây độc hại. Không những chỉ có tính năng làm đồ chơi, sản phẩm còn giúp mèo của bạn trở nên hoạt bát hơn, năng động hơn. Đồng thời còn có tác dụng để kích thích và định hướng mèo cào mài móng của mình, tránh làm hỏng hóc các đồ vật trong nhà. Đặc biệt nó còn gây tiếng động có tác dụng kích thích sự tò mò tự nhiên của mèo, giúp phát triển toàn diện hơn.', 500, 110000),
(13, 1022, N'Đồ chơi dây thừng cho chó mèo đan chéo BOBO', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067857/toys/do-choi-day-thung-cho-cho-meo-dan-cheo-bobo-1033_hivwwz.jpg', N'Sản phẩm giúp hạn chế nhu cầu gặm phá đồ đạc của thú cưng trong gia đình, khiến chúng thích thú và đùa nghịch suốt cả ngày.', 500, 55000),
(13, 1022, N'Đồ chơi cho mèo bằng cói BOBO hình cá', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067857/toys/do-choi-cho-meo-bang-coi-bobo-hinh-ca_mrnkgj.jpg', N'Đồ chơi cho mèo bằng cói BOBO hình cá với chất liệu bằng cói tự nhiên rất an toàn và không gây độc hại. Không những chỉ có tính năng làm đồ chơi, sản phẩm còn giúp mèo của bạn trở nên hoạt bát hơn, năng động hơn. Đồng thời còn có tác dụng để kích thích và định hướng mèo cào mài móng của mình, tránh làm hỏng hóc các đồ vật trong nhà. Đặc biệt nó còn gây tiếng động có tác dụng kích thích sự tò mò tự nhiên của mèo, giúp phát triển toàn diện hơn.', 500, 85000),
(13, 1022, N'Đồ chơi cho mèo bằng cói BOBO ống thừng 3 bóng', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067857/toys/do-choi-cho-meo-bang-coi-bobo-ong-thung-3-bong_owkr8t.jpg', N'Đồ chơi cho mèo bằng cói BOBO ống thừng 3 bóng với chất liệu bằng cói tự nhiên rất an toàn và không gây độc hại. Không những chỉ có tính năng làm đồ chơi, sản phẩm còn giúp mèo của bạn trở nên hoạt bát hơn, năng động hơn. Đồng thời còn có tác dụng để kích thích và định hướng mèo cào mài móng của mình, tránh làm hỏng hóc các đồ vật trong nhà. Đặc biệt nó còn gây tiếng động có tác dụng kích thích sự tò mò tự nhiên của mèo, giúp phát triển toàn diện hơn.', 500, 110000),
(13, 1022, N'Đồ chơi dây thừng cho chó mèo BOBO hình chó', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656067857/toys/do-choi-day-thung-cho-cho-meo-bobo-hinh-cho_hmfafh.webp', N'Sản phẩm giúp hạn chế nhu cầu gặm phá đồ đạc của thú cưng trong gia đình.', 500, 55000),

(11, 1011, N'Kềm cắt bấm móng chó mèo PAW Pet Nail Clipper', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069259/cares/kem-cat-bam-mong-cho-meo-paw-pet-nail-clipper_fr7dlq.webp', N'Kềm cắt bấm móng chó mèo PAW Pet Nail Clipper làm bằng vật liệu hợp kim chất lượng cao, bền, lưỡi kìm sắc nhọn. Hoạt động theo thiết kế vòng cung động cơ đẩy, dễ dàng sử dụng.', 500, 70000),
(11, 1023, N'Máy mài móng chó mèo JOYU Pet Nail Grinder N9', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/may-mai-mong-cho-meo-joyu-pet-nail-grinder-n91_epunmh.webp', N'JOYU Pet Nail Grinder N9 thiết kế tiện dụng, bạn có thể cảm thấy tay cầm rất thoải mái và máy dễ vận hành. Bạn có thể dễ dàng mài móng chó mèo của bạn ở nhà. Có 3 chức năng mài móng theo tốc độ: nhỏ, trung bình-lớn và nhanh. Mài móng cho chó mèo được hoạt động rất hiệu quả. Không gây đau, cắt tỉa, tạo hình theo yêu cầu và làm mịn móng cho thú cưng đáng yêu của bạn.', 500, 520000),
(11, 1016, N'Kềm cắt bấm móng chó mèo DELE Q022 Pet Nail Clipper', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069262/cares/kem-bam-mong-cho-meo-dele-q022-pet-nail-clipper_y76uqb.webp', N'Kềm cắt bấm móng chó mèo DELE Q022 Pet Nail Clipper nhằm giúp cho vật nuôi được vệ sinh sạch sẽ móng vuốt. Tránh cào xước hay làm hư hại đến đồ dùng trong nhà. Sản phẩm được thiết kế chất lượng với tay cầm bằng nhựa PP, chắc chắn. Lò xo giữa kìm, tăng độ đàn hồi tránh việc cắt vào da thịt của chó mèo', 500, 195000),
(11, 1016, N'Lược chải lông chó mèo bấm nút DELE M006 Round Head', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/luoc-chai-long-cho-meo-bam-nut-dele-m006-round-head-400x400_zcudhs.webp', N'Lược chải lông chó mèo bấm nút DELE  M006 Round Head phù hợp với tất cả các giống chó. Bao gồm cả các giống chó nhỏ và chó lớn như Poodle, Phốc sóc, Samoyel, Alaska…', 500, 140000),
(11, 1022, N'Lược chải lông chó mèo đầu lưỡi mềm BOBO Pet Comb', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/luoc-chai-long-cho-meo-dau-luoi-mem-bobo-pet-comb7_hmck5i.webp', N'Lược chải lông chó mèo đầu lưỡi mềm BOBO  Pet Comb sử dụng cho tất cả các giống cho mèo lông thẳng và lông xoăn.', 500, 85000),
(11, 1024, N'Sữa tắm khô cho chó mèo JOYCE & DOLLS Waterless Cleansing Foam', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/Sua-tam-kho-cho-cho-meo-Joyce-Dolls-Waterless-Cleansing-Foam0_fjpdkr.webp', N'Sữa tắm khô cho chó mèo JOYCE & DOLLS Waterless Cleansing Foam phù hợp đặc biệt là trong trường hợp đang bị bệnh, đang mang thai. Hoặc trong nhiều trường hợp khác không thể tắm rửa bằng nước. Sản phẩm này có thể thay thế cho việc tắm bằng nước thông thường, làm sạch bụi bẩn và mùi hôi mọi lúc mọi nơi. Phù hợp với tất cả các giống chó mèo.', 500, 180000),
(11, 1024, N'Sữa tắm cho chó mèo hương hoa hồng JOYCE & DOLLS Rose Dew', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/sua-tam-cho-cho-meo-huong-hoa-hong-joyce-dolls-rose-dew-0_fjyeu5.webp', N'Sữa tắm cho chó mèo hương hoa hồng JOYCE DOLLS  Rose Dew là sữa tắm cho chó mèo với tinh dầu chiết xuất từ hoa hồng. Dành cho tất cả các giống chó mèo như Poodle, Phốc sóc, Samoyed, Alaska, mèo Anh lông dài, lông ngắn…', 500, 250000),
(11, 1024, N'Dầu xả cho chó mèo dưỡng lông JOYCE & DOLLS Dog Coat Finishing Conditioner', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/dau-xa-cho-cho-meo-duong-long-joyce-dolls-dog-coat-finishing-conditioner_ut0rl2.jpg', N'Dầu xả cho chó mèo dưỡng lông JOYCE DOLLS  Dog Coat Finishing Conditioner, dành có tất cả các giống chó. Bao gồm cả chó mèo lông ngắn và lông dài như Poodle, Phốc sóc, Phốc, Pug, Alaska…', 500, 180000),
(11, 1029, N'Tã bỉm cho chó mèo cái 2 – 4kg VET’S BEST Disposable Diapers XSmall', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/ta-bim-cho-cho-meo-cai-2-4kg-vets-best-disposable-diapers-xsmall-400x400_ewpcp2.webp', N'Tã bỉm cho chó mèo cái 2 – 4kg VETS BEST Disposable Diapers XSmall là giải pháp đơn giản và hiệu quả cho thú cưng của bạn bị tiểu tiện bừa bãi và khi chó cái đến giai đoạn đèn đỏ. Tã bỉm cho chó có kích thước vừa vặn với thú cưng 2 – 4kg. Sản phẩm có đường chỉ cho biết độ ẩm để bạn biết khi nào cần thay bỉm cho chó. Mỗi chiếc tã đều có một rào chắn hạn chế sự rò rỉ nước ra ngoài. An toàn lông và cố định vị trí cho chó dễ dàng đi vệ sinh mọi lúc mọi nơi. Kích thước: 22 – 40cm.', 500, 85000),
(11, 1025, N'Tã bỉm cho chó mèo cái PET SOFT Disposable Diapers XXSmall 1-3kg', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/ta-bim-cho-cho-meo-cai-pet-soft-disposable-diapers-large-10-20kg_svflai.webp', N'Tã bỉm cho chó mèo cái PET SOFT  Disposable Diapers XXSmall 1-3kg là giải pháp đơn giản và hiệu quả cho thú cưng của bạn bị tiểu tiện bừa bãi và khi chó cái đến giai đoạn đèn đỏ. Tã bỉm cho chó có kích thước vừa vặn với thú cưng 1 đến 3kg. Sản phẩm có đường chỉ cho biết độ ẩm để bạn biết khi nào cần thay bỉm cho chó. Mỗi chiếc tã đều có một rào chắn hạn chế sự rò rỉ nước ra ngoài. An toàn lông và cố định vị trí cho chó dễ dàng đi vệ sinh mọi lúc mọi nơi', 500, 10000),
(11, 1025, N'Tã bỉm cho chó mèo cái PET SOFT Disposable Diapers Large 10-20kg', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/ta-bim-cho-cho-meo-cai-pet-soft-disposable-diapers-large-10-20kg_svflai.webp', N'Tã bỉm cho chó mèo cái PET SOFT  Disposable Diapers Large 10-20kg là giải pháp đơn giản và hiệu quả cho thú cưng của bạn bị tiểu tiện bừa bãi và khi chó cái đến giai đoạn đèn đỏ. Tã bỉm cho chó có kích thước vừa vặn với thú cưng 10 đến 20kg. Sản phẩm có đường chỉ cho biết độ ẩm để bạn biết khi nào cần thay bỉm cho chó. Mỗi chiếc tã đều có một rào chắn hạn chế sự rò rỉ nước ra ngoài. An toàn lông và cố định vị trí cho chó dễ dàng đi vệ sinh mọi lúc mọi nơi.', 500, 20000),
(11, 1026, N'Cát vệ sinh thủy tinh cho mèo TRIXIE Silikatstreu', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/cat-ve-sinh-cho-meo-trixiesilikatstreu_c3dn91.webp', N'Cát vệ sinh thủy tinh cho mèo TRIXIE Silikatstreu là dạng hạt, có khả năng hấp thụ nước tiểu của mèo rất nhanh', 500, 160000),
(11, 1026, N'Bột khử mùi nước tiểu và phân mèo TRIXIE Katzen-Streudeo', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069260/cares/bot-khu-mui-cat-ve-sinh-meo-trixie-katzen-streudeo-1_ao8ix8.webp', N'Bột khử mùi nước tiểu và phân mèo TRIXIE  Katzen-Streudeo được sử dụng để rắc phủ lên khu vực chậu cát vệ sinh của mèo, hỗ trợ giảm thiểu tối đa mùi hôi khó chịu từ nước tiểu và phân của mèo sau khi thải ra vào chậu cát vệ sinh.', 500, 150000),
(11, 1027, N'Thuốc tẩy giun cho chó BAYER Drontal Plus Flavour', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069259/cares/thuoc-tay-giun-cho-cho-bayer-drontal-plus-flavour1_jptbmt.webp', N'Thuốc tẩy giun cho chó BAYER  Drontal Plus Flavour For Dogs điều trị đa nhiễm giun tròn, giun đũa, giun tóc, giun móc và sán dây. Giúp tẩy xổ tất cả những loài giun trưởng thành và ấu trùng nguy hiểm trên chó gây co cơ, liệt cơ làm giun không bám được vào vật chủ, còn Febantel cản trở giun sử dụng năng lượng cho các hoạt động làm giun chết nhanh. Giải quyết những vấn đề gây rối loạn tiêu hóa, bỏ ăn, có hiện tượng mệt mỏi do giun quấy', 500, 55000),
(11, 1027, N'Thuốc xổ giun cho mèo BAYER Drontal Cat', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069259/cares/thuoc-xo-giun-cho-meo-bayer-drontal-cat_r37m4t.jpg', N'Thuốc xổ giun cho mèo BAYER  Drontal Cat sử dụng cho mèo con trên 6 tuần tuổi. Sử dụng 1 viên cho thể trọng 4kg. Có thể cho mèo ăn trực tiếp hoặc trộn lẫn vào thức ăn.', 500, 55000),
(11, 1028, N'Khay vệ sinh cho mèo MAKAR Cat Litter Station', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069259/cares/thuoc-xo-giun-cho-meo-bayer-drontal-cat_r37m4t.jpg', N'Khay vệ sinh cho mèo  MAKAR  Cat Litter Station phù hợp cho mèo con và các giống mèo cỡ nhỏ. Màu sắc: nâu cà phê, xanh biển, hồng, trắng kem. Kích thước: 46 x 36,3 x 11cm. Với kích thước nhỏ gọn, không chiếm diện tích quá lớn. Sản phẩm có độ bền cao, hình thức đẹp, màu sắc đa dạng.', 500, 250000),
(11, 1006, N'Khay vệ sinh cho chó thành cao IRIS TRT500', 'https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656069259/cares/ve-sinh-cho-cho-thanh-cao-iris-trt500-400x400_bnkzmc.webp', N'Khay vệ sinh cho chó thành cao IRIS  TRT500 với thiết kế hình vuông nhỏ gọn, thuận tiện cho việc cún cưng đi vệ sinh. Sử dụng chất liệu nhựa tổng hợp chất lượng cao. Có tính đàn hồi giúp chó mèo dẫm lên cảm thấy thoải mái. Phù hợp với tất cả các giống chó mèo, giới tính đực và cái.', 500, 395000);

-- 10000, 1
INSERT INTO PHIEU_NHAP_HANG (MANPP, MACN, NGAY_LAP, TONG_TIEN_NHAP, TONG_SO_MAT_HANG) 
VALUES 
(1000, 200, '2022-05-15 12:21:37', 1900000, 2),
(1002, 200, '2022-05-23 19:10:25', 2000000, 1),
(1003, 203, '2022-06-01 09:08:07', 1500000, 2),
(1006, 205, '2022-06-05 18:32:30', 8900000, 5),
(1012, 205, '2022-06-09 11:30:09', 13800000, 3),
(1015, 205, '2022-06-13 12:47:13', 3650000, 1),
(1017, 206, '2022-06-21 14:20:05', 7220000, 5),
(1018, 207, '2022-06-28 15:41:42', 2800000, 1),
(1015, 208, '2022-06-28 12:52:25', 2600000, 3),
(1008, 201, '2022-07-04 19:53:06', 1200000, 1),
(1022, 202, '2022-07-04 19:53:06', 3200000, 4);

-- 
INSERT INTO CHI_TIET_NHAP_HANG (MAPN, MASP, SO_LUONG_NHAP, DON_GIA_NHAP) 
VALUES 
(10000, 200000, 10, 120000),
(10000, 200002, 10, 70000),
(10001, 200007, 10, 200000),
(10002, 200011, 20, 30000),
(10002, 200012, 30, 30000),
(10003, 200008, 10, 20000),
(10003, 200016, 10, 20000),
(10003, 200020, 10, 150000),
(10003, 200023, 3, 1400000),
(10003, 200024, 2, 1400000),
(10004, 200028, 2, 3200000),
(10004, 200029, 7, 350000),
(10004, 200031, 3, 1650000),
(10005, 200034, 10, 365000),
(10006, 200036, 10, 155000),
(10006, 200037, 10, 220000),
(10006, 200038, 5, 240000),
(10006, 200040, 5, 235000),
(10006, 200043, 5, 215000),
(10007, 200044, 10, 280000),
(10008, 200051, 30, 35000),
(10008, 200052, 20, 35000),
(10008, 200053, 10, 85000),
(10009, 200019, 40, 30000),
(10010, 200061, 10, 85000),
(10010, 200062, 20, 40000),
(10010, 200064, 10, 90000),
(10010, 200063, 10, 65000);

--
INSERT INTO DIA_CHI_KH (MAKH, STT, SO_NHA_DUONG, PHUONG_XA, QUAN_TP, TP_TINH, DISTRICTID, MAC_DINH) 
VALUES 
(1000000, 1, N'227 Nguyễn Văn Cừ', N'7', N'5', N'HCM','1447', TRUE),
(1000000, 2, N'85 Nguyễn Tất Thành', N'5', N'2', N'HCM','1443', FALSE),
(1000001, 1, N'37 Nguyễn Thị Minh Khai', N'6', N'7', N'Hà Nội','3440' , TRUE),
(1000002, 1, N'50 Võ Văn Kiệt', N'An Lạc', N'Bình Tân', N'HCM','1458', TRUE),
(1000002, 2, N'491 Hậu Giang', N'11', N'6', N'HCM','1448', FALSE),
(1000002, 3, N'9 Trần Hưng Đạo', N'Nguyễn Thái Bình', N'1', N'HCM','1442', FALSE),
(1000003, 1, N'324 Nguyễn Văn Linh', N'2', N'7', N'HCM','1449', TRUE),
(1000005, 1, N'51 Hùng Vương', N'5', N'Vũng Tàu', N'Bà Rịa - Vũng Tàu','1544', TRUE),
(1000008, 1, N'112 Nguyễn Văn Trỗi', N'6', N'Đà Lạt', N'Lâm Đồng','1550', TRUE),
(1000012, 1, N'147 Nguyễn Tri Phương', N'4', N'5', N'HCM','1446', TRUE);

-- 500000, 1
INSERT INTO DON_HANG (MAKH, MACN, PHI_SAN_PHAM, PHI_VAN_CHUYEN, HINH_THUC_THANH_TOAN, HINH_THUC_GIAO_HANG, ID_DIA_CHI_GIAO,TRANG_THAI) 
VALUES 
(1000000, 200, 279000, 35000, N'COD' ,'GHN', 1, 'ĐÃ XÁC NHẬN'),
(1000003, 208, 327000, 20000, N'MOMO','GHN', 1, 'ĐÃ GIAO'),
(1000008, 203, 175000, 35000, N'MOMO','GHN', 1, 'ĐANG GIAO'),
(1000001, 201, 612500, 45000, N'COD' ,'GHTK_NORM', 1, 'ĐÃ HỦY'),
(1000005, 200, 535000, 30000, N'COD' ,'GHTK_NORM', 1, 'CHỜ XÁC NHẬN'),
(1000012, 205, 564500, 45000, N'MOMO','GHN', 1, 'ĐÃ GIAO'),
(1000002, 205, 310000, 20000, N'MOMO','GHN', 1, 'CHỜ XÁC NHẬN'),
(1000002, 208, 410000, 20000, N'MOMO','GHN', 1, 'CHỜ XÁC NHẬN'),
(1000002, 203, 460000, 20000, N'MOMO','GHTK_FAST', 1, 'ĐANG GIAO'),
(1000001, 202, 420000, 45000, N'COD' ,'GHN', 1, 'CHỜ XÁC NHẬN'),
(1000001, 205, 480000, 45000, N'COD' ,'GHN',1, 'CHỜ XÁC NHẬN');

--
INSERT INTO CHI_TIET_DON_HANG (MADH, MASP, MA_VOUCHER, SO_LUONG_MUA, GIA_PHAI_TRA) 
VALUES 
(500000, 200000, 100003, 2, 100000),
(500001, 200005, 100003, 1, 207000),
(500001, 200012, NULL, 3, 40000),
(500002, 200020, NULL, 1, 175000),
(500003, 200010, NULL, 4, 140000),
(500003, 200047, 100003, 1, 472500),
(500004, 200018, 100004, 1, 140000),
(500004, 200034, NULL, 1, 395000),
(500005, 200008, 100003, 3, 30000),
(500005, 200029, 100003, 1, 360000),
(500005, 200080, NULL, 2, 55000),
(500006, 200000, NULL, 2, 165000),
(500007, 200010, NULL, 1, 35000),
(500007, 200001, NULL, 1, 185000),
(500007, 200002, NULL, 2, 95000),
(500008, 200005, NULL, 2, 230000),
(500009, 200020, NULL, 1, 175000),
(500009, 200047, NULL, 1, 245000),
(500010, 200040, NULL, 1, 180000),
(500010, 200050, NULL, 1, 300000);

--
INSERT INTO TRANG_THAI_DH (MADH, TRANG_THAI, THOI_GIAN) 
VALUES 
(500000, N'CHỜ XÁC NHẬN', '2022-04-07 19:53:06'),
(500000, N'ĐÃ XÁC NHẬN', '2022-04-08 07:22:41'),
(500001, N'CHỜ XÁC NHẬN', '2022-03-27 12:43:08'),
(500001, N'ĐÃ XÁC NHẬN', '2022-03-27 13:34:45'),
(500001, N'ĐANG GIAO', '2022-03-28 09:20:15'),
(500001, N'ĐÃ GIAO', '2022-03-30 11:33:21'),
(500002, N'CHỜ XÁC NHẬN', '2022-04-30 13:36:19'),
(500002, N'ĐÃ XÁC NHẬN', '2022-04-30 15:41:23'),
(500002, N'ĐANG GIAO', '2022-05-02 08:47:36'),
(500003, N'CHỜ XÁC NHẬN', '2022-04-08 14:13:12'),
(500003, N'ĐÃ XÁC NHẬN', '2022-04-08 14:45:52'),
(500003, N'ĐÃ HỦY', '2022-04-08 15:01:03'),
(500004, N'CHỜ XÁC NHẬN', '2022-07-09 02:07:49'),
(500005, N'CHỜ XÁC NHẬN', '2022-05-23 14:39:45'),
(500005, N'ĐÃ XÁC NHẬN', '2022-05-23 15:32:31'),
(500005, N'ĐANG GIAO', '2022-05-24 13:14:52'),
(500006, N'CHỜ XÁC NHẬN', '2022-07-09 18:52:12'),
(500007, N'CHỜ XÁC NHẬN', '2022-07-09 20:30:20'),
(500008, N'CHỜ XÁC NHẬN', '2022-07-10 21:36:19'),
(500008, N'ĐÃ XÁC NHẬN', '2022-07-11 08:30:23'),
(500008, N'ĐANG GIAO', '2022-07-11 15:50:36'),
(500009, N'CHỜ XÁC NHẬN', '2022-07-11 09:15:39'),
(500010, N'CHỜ XÁC NHẬN', '2022-07-11 20:28:15');
--
INSERT INTO HOP_DONG_QUANG_CAO (MAKH, STT, HINH_ANH_QC, TG_BAT_DAU, TG_KET_THUC, VI_TRI, CHI_PHI, LINK_WEBSITE, CHECK_THANH_TOAN) 
VALUES 
(1000019, 1, 'https://ohay.vn/blog/wp-content/uploads/2020/02/pet-things-2.png', '2022-05-01 00:00:00', '2022-08-01 00:00:00', 3, 2400000, 'https://ohay.vn/', TRUE);

--
INSERT INTO LICH_SU_GIA (MASP, THOI_GIAN, DON_GIA) 
VALUES 
(200000, '2021-04-21 13:30:26', 150000),
(200000, '2021-06-22 15:26:32', 155000);

--
INSERT INTO KHO (MASP, MACN, SO_LUONG_TON, SO_LUONG_DA_BAN) 
VALUES 
(200000, 200, 1428, 12252),
(200001, 200, 459, 3121),
(200002, 200, 791, 4859),
(200003, 200, 394, 7666),
(200004, 200, 184, 2426),
(200005, 200, 89, 5591),
(200006, 200, 129, 2531),
(200007, 200, 67, 543),
(200008, 200, 123, 2557),
(200009, 200, 432, 5258),
(200010, 200, 159, 1421),
(200011, 200, 151, 4159),
(200012, 200, 167, 5363),
(200013, 200, 154, 1746),
(200014, 200, 237, 1513),
(200015, 200, 268, 1122),
(200016, 200, 54, 2126),
(200017, 200, 82, 1128),
(200018, 200, 2, 2258),
(200019, 200, 163, 147),
(200020, 200, 125, 255),
(200021, 200, 62, 138),
(200022, 200, 256, 524),
(200023, 200, 157, 153),
(200024, 200, 5, 195),
(200025, 200, 25, 1125),
(200026, 200, 156, 314),
(200027, 200, 142, 498),
(200028, 200, 179, 141),
(200029, 200, 191, 419),
(200030, 200, 164, 366),
(200031, 200, 144, 126),
(200032, 200, 9, 121),
(200033, 200, 1, 149),
(200034, 200, 141, 19),
(200035, 200, 15, 165),
(200036, 200, 167, 273),
(200037, 200, 137, 153),
(200038, 200, 151, 569),
(200039, 200, 52, 168),
(200040, 200, 26, 424),
(200041, 200, 154, 466),
(200042, 200, 254, 3),
(200043, 200, 14, 156),
(200044, 200, 15, 455),
(200045, 200, 256, 264),
(200046, 200, 5437, 2343),
(200047, 200, 191, 59),
(200048, 200, 194, 66),
(200049, 200, 184, 26),
(200050, 200, 9, 191),
(200051, 200, 82, 168),
(200052, 200, 39, 271),
(200053, 200, 38, 262),
(200054, 200, 142, 258),
(200055, 200, 159, 421),
(200056, 200, 191, 359),
(200057, 200, 194, 166),
(200058, 200, 184, 126),
(200059, 200, 189, 981),
(200060, 200, 289, 191),
(200061, 200, 155, 145),
(200062, 200, 147, 173),
(200063, 200, 176, 264),
(200064, 200, 159, 21),
(200065, 200, 191, 59),
(200066, 200, 194, 66),
(200067, 200, 184, 26),
(200068, 200, 37, 193),
(200069, 200, 357, 1593),
(200070, 200, 32, 158),
(200071, 200, 156, 1194),
(200072, 200, 142, 658),
(200073, 200, 459, 621),
(200074, 200, 191, 1259),
(200075, 200, 194, 66),
(200076, 200, 184, 26),
(200077, 200, 37, 543),
(200078, 200, 366, 134),
(200079, 200, 13, 787),
(200080, 200, 43, 677),
(200081, 200, 20, 150),
(200082, 200, 58, 322),

(200000, 201, 2428, 7252),
(200001, 201, 478, 3212),
(200002, 201, 991, 2859),
(200003, 201, 732, 6548),
(200004, 201, 484, 3226),
(200005, 201, 14, 9596),
(200006, 201, 729, 1781),
(200007, 201, 167, 343),
(200008, 201, 127, 1553),
(200009, 201, 499, 4851),
(200010, 201, 132, 1728),
(200011, 201, 161, 3129),
(200012, 201, 97, 5963),
(200013, 201, 154, 1742),
(200014, 201, 297, 1643),
(200015, 201, 217, 1533),
(200016, 201, 154, 2336),
(200017, 201, 82, 728),
(200018, 201, 122, 1258),
(200019, 201, 157, 43),
(200020, 201, 136, 264),
(200021, 201, 26, 194),
(200022, 201, 267, 533),
(200023, 201, 114, 126),
(200024, 201, 55, 245),
(200025, 201, 237, 943),
(200026, 201, 164, 116),
(200027, 201, 163, 647),
(200028, 201, 174, 136),
(200029, 201, 112, 558),
(200030, 201, 122, 378),
(200031, 201, 164, 156),
(200032, 201, 97, 113),
(200033, 201, 123, 47),
(200034, 201, 7, 193),
(200035, 201, 156, 264),
(200036, 201, 215, 245),
(200037, 201, 164, 136),
(200038, 201, 189, 321),
(200039, 201, 55, 145),
(200040, 201, 86, 324),
(200041, 201, 125, 355),
(200042, 201, 236, 64),
(200043, 201, 147, 53),
(200044, 201, 190, 310),
(200045, 201, 101, 299),
(200046, 201, 2437, 2563),
(200047, 201, 162, 58),
(200048, 201, 197, 63),
(200049, 201, 126, 64),
(200050, 201, 16, 214),
(200051, 201, 174, 26),
(200052, 201, 266, 114),
(200053, 201, 0, 450),
(200054, 201, 367, 33),
(200055, 201, 179, 461),
(200056, 201, 142, 328),
(200057, 201, 142, 158),
(200058, 201, 162, 138),
(200059, 201, 153, 257),
(200060, 201, 223, 137),
(200061, 201, 126, 164),
(200062, 201, 123, 177),
(200063, 201, 125, 245),
(200064, 201, 111, 39),
(200065, 201, 197, 53),
(200066, 201, 195, 15),
(200067, 201, 184, 66),
(200068, 201, 37, 133),
(200069, 201, 323, 1567),
(200070, 201, 38, 152),
(200071, 201, 153, 1137),
(200072, 201, 141, 659),
(200073, 201, 278, 962),
(200074, 201, 235, 975),
(200075, 201, 126, 94),
(200076, 201, 142, 38),
(200077, 201, 5, 745),
(200078, 201, 315, 35),
(200079, 201, 262, 538),
(200080, 201, 24, 976),
(200081, 201, 37, 163),
(200082, 201, 48, 322),

(200000, 202, 1378, 11112),
(200001, 202, 219, 4321),
(200002, 202, 671, 3649),
(200003, 202, 268, 7322),
(200004, 202, 163, 2447),
(200005, 202, 43, 5127),
(200006, 202, 189, 2131),
(200007, 202, 77, 443),
(200008, 202, 135, 2355),
(200009, 202, 241, 5159),
(200010, 202, 169, 1321),
(200011, 202, 137, 4143),
(200012, 202, 162, 5368),
(200013, 202, 163, 1357),
(200014, 202, 244, 1246),
(200015, 202, 212, 1358),
(200016, 202, 59, 2121),
(200017, 202, 89, 1121),
(200018, 202, 20, 2580),
(200019, 202, 116, 144),
(200020, 202, 167, 223),
(200021, 202, 28, 172),
(200022, 202, 242, 528),
(200023, 202, 148, 132),
(200024, 202, 0, 250),
(200025, 202, 121, 979),
(200026, 202, 14, 456),
(200027, 202, 158, 322),
(200028, 202, 157, 133),
(200029, 202, 137, 423),
(200030, 202, 154, 376),
(200031, 202, 184, 146),
(200032, 202, 0, 150),
(200033, 202, 0, 150),
(200034, 202, 167, 33),
(200035, 202, 10, 190),
(200036, 202, 136, 264),
(200037, 202, 143, 157),
(200038, 202, 153, 567),
(200039, 202, 58, 162),
(200040, 202, 24, 426),
(200041, 202, 254, 316),
(200042, 202, 154, 16),
(200043, 202, 15, 125),
(200044, 202, 52, 338),
(200045, 202, 256, 264),
(200046, 202, 5267, 2243),
(200047, 202, 151, 49),
(200048, 202, 193, 67),
(200049, 202, 134, 56),
(200050, 202, 2, 198),
(200051, 202, 32, 168),
(200052, 202, 89, 261),
(200053, 202, 68, 242),
(200054, 202, 132, 278),
(200055, 202, 129, 451),
(200056, 202, 194, 356),
(200057, 202, 152, 138),
(200058, 202, 161, 179),
(200059, 202, 145, 945),
(200060, 202, 229, 151),
(200061, 202, 136, 144),
(200062, 202, 126, 164),
(200063, 202, 183, 277),
(200064, 202, 185, 15),
(200065, 202, 152, 48),
(200066, 202, 165, 35),
(200067, 202, 172, 38),
(200068, 202, 21, 179),
(200069, 202, 337, 1673),
(200070, 202, 39, 161),
(200071, 202, 153, 1147),
(200072, 202, 134, 656),
(200073, 202, 452, 638),
(200074, 202, 127, 1783),
(200075, 202, 146, 24),
(200076, 202, 147, 23),
(200077, 202, 13, 247),
(200078, 202, 246, 324),
(200079, 202, 3, 797),
(200080, 202, 53, 657),
(200081, 202, 40, 160),
(200082, 202, 53, 347),

(200000, 203, 1128, 4562),
(200001, 203, 348, 2342),
(200002, 203, 561, 1469),
(200003, 203, 332, 4328),
(200004, 203, 244, 2256),
(200005, 203, 44, 5676),
(200006, 203, 259, 1291),
(200007, 203, 257, 423),
(200008, 203, 677, 383),
(200009, 203, 329, 2781),
(200010, 203, 532, 2678),
(200011, 203, 51, 2559),
(200012, 203, 47, 2783),
(200013, 203, 94, 1532),
(200014, 203, 267, 383),
(200015, 203, 537, 1123),
(200016, 203, 64, 976),
(200017, 203, 52, 628),
(200018, 203, 252, 958),
(200019, 203, 97, 83),
(200020, 203, 636, 164),
(200021, 203, 13, 157),
(200022, 203, 317, 153),
(200023, 203, 134, 166),
(200024, 203, 52, 228),
(200025, 203, 235, 945),
(200026, 203, 142, 158),
(200027, 203, 152, 648),
(200028, 203, 164, 146),
(200029, 203, 122, 568),
(200030, 203, 142, 328),
(200031, 203, 124, 156),
(200032, 203, 57, 123),
(200033, 203, 143, 97),
(200034, 203, 2, 198),
(200035, 203, 0, 700),
(200036, 203, 221, 219),
(200037, 203, 144, 116),
(200038, 203, 126, 324),
(200039, 203, 58, 142),
(200040, 203, 56, 374),
(200041, 203, 55, 465),
(200042, 203, 126, 74),
(200043, 203, 147, 123),
(200044, 203, 153, 257),
(200045, 203, 18, 262),
(200046, 203, 237, 2753),
(200047, 203, 0, 500),
(200048, 203, 251, 149),
(200049, 203, 135, 35),
(200050, 203, 0, 300),
(200051, 203, 365, 15),
(200052, 203, 254, 426),
(200053, 203, 123, 227),
(200054, 203, 347, 53),
(200055, 203, 132, 448),
(200056, 203, 152, 338),
(200057, 203, 96, 144),
(200058, 203, 152, 148),
(200059, 203, 162, 238),
(200060, 203, 226, 134),
(200061, 203, 157, 133),
(200062, 203, 147, 143),
(200063, 203, 138, 252),
(200064, 203, 158, 22),
(200065, 203, 136, 94),
(200066, 203, 146, 44),
(200067, 203, 147, 13),
(200068, 203, 34, 156),
(200069, 203, 372, 1128),
(200070, 203, 0, 100),
(200071, 203, 120, 880),
(200072, 203, 153, 357),
(200073, 203, 242, 378),
(200074, 203, 115, 875),
(200075, 203, 272, 98),
(200076, 203, 152, 48),
(200077, 203, 12, 448),
(200078, 203, 374, 36),
(200079, 203, 42, 368),
(200080, 203, 22, 946),
(200081, 203, 77, 123),
(200082, 203, 98, 302),

(200000, 204, 1732, 10158),
(200001, 204, 552, 3258),
(200002, 204, 461, 3579),
(200003, 204, 534, 6496),
(200004, 204, 143, 2357),
(200005, 204, 119, 6641),
(200006, 204, 179, 2381),
(200007, 204, 107, 593),
(200008, 204, 146, 2764),
(200009, 204, 483, 5432),
(200010, 204, 152, 1468),
(200011, 204, 119, 4421),
(200012, 204, 157, 5243),
(200013, 204, 194, 1446),
(200014, 204, 233, 1357),
(200015, 204, 135, 3565),
(200016, 204, 64, 2126),
(200017, 204, 72, 438),
(200018, 204, 20, 2080),
(200019, 204, 163, 157),
(200020, 204, 165, 225),
(200021, 204, 32, 168),
(200022, 204, 216, 524),
(200023, 204, 157, 153),
(200024, 204, 17, 163),
(200025, 204, 42, 1355),
(200026, 204, 146, 354),
(200027, 204, 14, 536),
(200028, 204, 143, 157),
(200029, 204, 121, 459),
(200030, 204, 154, 316),
(200031, 204, 194, 126),
(200032, 204, 19, 101),
(200033, 204, 12, 179),
(200034, 204, 21, 129),
(200035, 204, 0, 170),
(200036, 204, 153, 247),
(200037, 204, 107, 153),
(200038, 204, 121, 219),
(200039, 204, 0, 200),
(200040, 204, 46, 324),
(200041, 204, 125, 465),
(200042, 204, 253, 17),
(200043, 204, 0, 170),
(200044, 204, 3, 197),
(200045, 204, 0, 150),
(200046, 204, 2231, 4329),
(200047, 204, 0, 150),
(200048, 204, 153, 167),
(200049, 204, 142, 28),
(200050, 204, 32, 158),
(200051, 204, 48, 162),
(200052, 204, 35, 275),
(200053, 204, 35, 265),
(200054, 204, 153, 237),
(200055, 204, 150, 420),
(200056, 204, 161, 359),
(200057, 204, 154, 136),
(200058, 204, 144, 126),
(200059, 204, 139, 921),
(200060, 204, 219, 101),
(200061, 204, 105, 195),
(200062, 204, 137, 173),
(200063, 204, 176, 254),
(200064, 204, 119, 81),
(200065, 204, 131, 49),
(200066, 204, 164, 46),
(200067, 204, 154, 76),
(200068, 204, 35, 195),
(200069, 204, 353, 1597),
(200070, 204, 32, 148),
(200071, 204, 146, 1424),
(200072, 204, 145, 655),
(200073, 204, 458, 642),
(200074, 204, 161, 1259),
(200075, 204, 0, 1200),
(200076, 204, 133, 27),
(200077, 204, 38, 542),
(200078, 204, 356, 184),
(200079, 204, 23, 757),
(200080, 204, 0, 680),
(200081, 204, 31, 169),
(200082, 204, 68, 362),

(200000, 205, 2421, 5659),
(200001, 205, 278, 2312),
(200002, 205, 771, 2129),
(200003, 205, 701, 6429),
(200004, 205, 442, 3218),
(200005, 205, 123, 7126),
(200006, 205, 249, 1161),
(200007, 205, 127, 213),
(200008, 205, 47, 1003),
(200009, 205, 159, 2441),
(200010, 205, 125, 1325),
(200011, 205, 152, 3058),
(200012, 205, 45, 2345),
(200013, 205, 124, 1456),
(200014, 205, 253, 1357),
(200015, 205, 118, 1232),
(200016, 205, 146, 1344),
(200017, 205, 52, 448),
(200018, 205, 342, 828),
(200019, 205, 227, 143),
(200020, 205, 121, 239),
(200021, 205, 46, 144),
(200022, 205, 137, 313),
(200023, 205, 173, 117),
(200024, 205, 24, 73),
(200025, 205, 141, 779),
(200026, 205, 144, 136),
(200027, 205, 103, 447),
(200028, 205, 144, 126),
(200029, 205, 97, 313),
(200030, 205, 102, 138),
(200031, 205, 114, 156),
(200032, 205, 47, 123),
(200033, 205, 103, 97),
(200034, 205, 12, 188),
(200035, 205, 156, 244),
(200036, 205, 217, 223),
(200037, 205, 164, 136),
(200038, 205, 119, 281),
(200039, 205, 25, 195),
(200040, 205, 0, 350),
(200041, 205, 0, 300),
(200042, 205, 246, 54),
(200043, 205, 141, 59),
(200044, 205, 113, 287),
(200045, 205, 106, 224),
(200046, 205, 2211, 1489),
(200047, 205, 122, 28),
(200048, 205, 105, 95),
(200049, 205, 135, 35),
(200050, 205, 0, 210),
(200051, 205, 149, 21),
(200052, 205, 73, 27),
(200053, 205, 45, 155),
(200054, 205, 115, 245),
(200055, 205, 145, 235),
(200056, 205, 143, 147),
(200057, 205, 102, 188),
(200058, 205, 122, 178),
(200059, 205, 115, 225),
(200060, 205, 113, 197),
(200061, 205, 156, 104),
(200062, 205, 13, 177),
(200063, 205, 25, 225),
(200064, 205, 116, 44),
(200065, 205, 126, 54),
(200066, 205, 176, 34),
(200067, 205, 177, 33),
(200068, 205, 0, 150),
(200069, 205, 121, 779),
(200070, 205, 75, 125),
(200071, 205, 127, 783),
(200072, 205, 144, 436),
(200073, 205, 278, 962),
(200074, 205, 112, 438),
(200075, 205, 116, 54),
(200076, 205, 102, 98),
(200077, 205, 50, 550),
(200078, 205, 245, 55),
(200079, 205, 232, 288),
(200080, 205, 41, 389),
(200081, 205, 146, 54),
(200082, 205, 48, 142),

(200000, 206, 1100, 10050),
(200001, 206, 449, 2241),
(200002, 206, 221, 4229),
(200003, 206, 244, 4526),
(200004, 206, 224, 4006),
(200005, 206, 221, 3211),
(200006, 206, 119, 2001),
(200007, 206, 60, 540),
(200008, 206, 153, 2567),
(200009, 206, 472, 5238),
(200010, 206, 131, 1229),
(200011, 206, 51, 2559),
(200012, 206, 47, 2783),
(200013, 206, 94, 1532),
(200014, 206, 267, 383),
(200015, 206, 537, 1123),
(200016, 206, 64, 976),
(200017, 206, 52, 628),
(200018, 206, 252, 958),
(200019, 206, 97, 83),
(200020, 206, 636, 164),
(200021, 206, 26, 194),
(200022, 206, 267, 533),
(200023, 206, 114, 126),
(200024, 206, 55, 245),
(200025, 206, 237, 943),
(200026, 206, 164, 116),
(200027, 206, 163, 647),
(200028, 206, 174, 136),
(200029, 206, 112, 558),
(200030, 206, 122, 378),
(200031, 206, 144, 126),
(200032, 206, 9, 121),
(200033, 206, 1, 149),
(200034, 206, 141, 19),
(200035, 206, 15, 165),
(200036, 206, 167, 273),
(200037, 206, 137, 153),
(200038, 206, 151, 569),
(200039, 206, 52, 168),
(200040, 206, 24, 426),
(200041, 206, 254, 316),
(200042, 206, 154, 16),
(200043, 206, 15, 125),
(200044, 206, 52, 338),
(200045, 206, 256, 264),
(200046, 206, 5267, 2243),
(200047, 206, 151, 49),
(200048, 206, 193, 67),
(200049, 206, 134, 56),
(200050, 206, 2, 198),
(200051, 206, 48, 162),
(200052, 206, 35, 275),
(200053, 206, 35, 265),
(200054, 206, 153, 237),
(200055, 206, 150, 420),
(200056, 206, 161, 359),
(200057, 206, 154, 136),
(200058, 206, 144, 126),
(200059, 206, 139, 921),
(200060, 206, 219, 101),
(200061, 206, 156, 104),
(200062, 206, 13, 177),
(200063, 206, 25, 225),
(200064, 206, 116, 44),
(200065, 206, 126, 54),
(200066, 206, 176, 34),
(200067, 206, 177, 33),
(200068, 206, 0, 150),
(200069, 206, 121, 779),
(200070, 206, 75, 125),
(200071, 206, 153, 1147),
(200072, 206, 134, 656),
(200073, 206, 452, 638),
(200074, 206, 127, 1783),
(200075, 206, 146, 24),
(200076, 206, 147, 23),
(200077, 206, 13, 247),
(200078, 206, 246, 324),
(200079, 206, 3, 797),
(200080, 206, 53, 657),
(200081, 206, 40, 160),
(200082, 206, 53, 347),

(200000, 207, 2003, 5257),
(200001, 207, 328, 2102),
(200002, 207, 591, 1559),
(200003, 207, 532, 2138),
(200004, 207, 484, 3226),
(200005, 207, 89, 5591),
(200006, 207, 129, 2531),
(200007, 207, 67, 543),
(200008, 207, 123, 2557),
(200009, 207, 432, 5258),
(200010, 207, 159, 1421),
(200011, 207, 151, 4159),
(200012, 207, 167, 5363),
(200013, 207, 154, 1746),
(200014, 207, 297, 1643),
(200015, 207, 217, 1533),
(200016, 207, 154, 2336),
(200017, 207, 82, 728),
(200018, 207, 122, 1258),
(200019, 207, 157, 43),
(200020, 207, 136, 264),
(200021, 207, 26, 194),
(200022, 207, 267, 533),
(200023, 207, 114, 126),
(200024, 207, 55, 245),
(200025, 207, 237, 943),
(200026, 207, 164, 116),
(200027, 207, 158, 322),
(200028, 207, 157, 133),
(200029, 207, 137, 423),
(200030, 207, 154, 376),
(200031, 207, 184, 146),
(200032, 207, 0, 150),
(200033, 207, 0, 150),
(200034, 207, 167, 33),
(200035, 207, 10, 190),
(200036, 207, 136, 264),
(200037, 207, 143, 157),
(200038, 207, 153, 567),
(200039, 207, 58, 162),
(200040, 207, 24, 426),
(200041, 207, 55, 465),
(200042, 207, 126, 74),
(200043, 207, 147, 123),
(200044, 207, 153, 257),
(200045, 207, 18, 262),
(200046, 207, 237, 2753),
(200047, 207, 0, 500),
(200048, 207, 251, 149),
(200049, 207, 135, 35),
(200050, 207, 0, 300),
(200051, 207, 365, 15),
(200052, 207, 254, 426),
(200053, 207, 123, 227),
(200054, 207, 347, 53),
(200055, 207, 132, 448),
(200056, 207, 161, 359),
(200057, 207, 154, 136),
(200058, 207, 144, 126),
(200059, 207, 139, 921),
(200060, 207, 219, 101),
(200061, 207, 105, 195),
(200062, 207, 137, 173),
(200063, 207, 176, 254),
(200064, 207, 119, 81),
(200065, 207, 131, 49),
(200066, 207, 164, 46),
(200067, 207, 154, 76),
(200068, 207, 35, 195),
(200069, 207, 121, 779),
(200070, 207, 75, 125),
(200071, 207, 127, 783),
(200072, 207, 144, 436),
(200073, 207, 278, 962),
(200074, 207, 112, 438),
(200075, 207, 116, 54),
(200076, 207, 102, 98),
(200077, 207, 50, 550),
(200078, 207, 245, 55),
(200079, 207, 232, 288),
(200080, 207, 41, 389),
(200081, 207, 146, 54),
(200082, 207, 48, 142),

(200000, 208, 1012, 9878),
(200001, 208, 109, 2011),
(200002, 208, 241, 1029),
(200003, 208, 214, 3566),
(200004, 208, 334, 4256),
(200005, 208, 112, 3218),
(200006, 208, 129, 2531),
(200007, 208, 67, 543),
(200008, 208, 123, 2557),
(200009, 208, 432, 5258),
(200010, 208, 159, 1421),
(200011, 208, 151, 4159),
(200012, 208, 167, 5363),
(200013, 208, 154, 1746),
(200014, 208, 297, 1643),
(200015, 208, 217, 1533),
(200016, 208, 64, 976),
(200017, 208, 52, 628),
(200018, 208, 252, 958),
(200019, 208, 97, 83),
(200020, 208, 636, 164),
(200021, 208, 26, 194),
(200022, 208, 267, 533),
(200023, 208, 114, 126),
(200024, 208, 55, 245),
(200025, 208, 141, 779),
(200026, 208, 144, 136),
(200027, 208, 103, 447),
(200028, 208, 144, 126),
(200029, 208, 97, 313),
(200030, 208, 102, 138),
(200031, 208, 114, 156),
(200032, 208, 47, 123),
(200033, 208, 103, 97),
(200034, 208, 12, 188),
(200035, 208, 156, 244),
(200036, 208, 217, 223),
(200037, 208, 164, 136),
(200038, 208, 119, 281),
(200039, 208, 25, 195),
(200040, 208, 46, 324),
(200041, 208, 125, 465),
(200042, 208, 253, 17),
(200043, 208, 0, 170),
(200044, 208, 3, 197),
(200045, 208, 0, 150),
(200046, 208, 2231, 4329),
(200047, 208, 0, 150),
(200048, 208, 153, 167),
(200049, 208, 142, 28),
(200050, 208, 32, 158),
(200051, 208, 365, 15),
(200052, 208, 254, 426),
(200053, 208, 123, 227),
(200054, 208, 347, 53),
(200055, 208, 132, 448),
(200056, 208, 152, 338),
(200057, 208, 96, 144),
(200058, 208, 152, 148),
(200059, 208, 162, 238),
(200060, 208, 226, 134),
(200061, 208, 157, 133),
(200062, 208, 126, 164),
(200063, 208, 183, 277),
(200064, 208, 185, 15),
(200065, 208, 152, 48),
(200066, 208, 165, 35),
(200067, 208, 172, 38),
(200068, 208, 21, 179),
(200069, 208, 337, 1673),
(200070, 208, 39, 161),
(200071, 208, 153, 1147),
(200072, 208, 134, 656),
(200073, 208, 278, 962),
(200074, 208, 235, 975),
(200075, 208, 126, 94),
(200076, 208, 142, 38),
(200077, 208, 5, 745),
(200078, 208, 315, 35),
(200079, 208, 262, 538),
(200080, 208, 24, 976),
(200081, 208, 37, 163),
(200082, 208, 48, 322)
on conflict on CONSTRAINT PK_BAN 
do update 
set SO_LUONG_TON = EXCLUDED.SO_LUONG_TON,
	SO_LUONG_DA_BAN = EXCLUDED.SO_LUONG_DA_BAN;

UPDATE SAN_PHAM
SET MA_VOUCHER = 100009
WHERE MASP IN (200000, 200003, 200007, 200013, 200022, 200027, 200042, 200047, 200048, 200063, 200081, 200082); 

UPDATE SAN_PHAM
SET MA_VOUCHER = 100010
WHERE MASP IN (200001, 200002, 200010, 200033, 200038, 200043, 200055, 200056, 200062, 200066, 200071, 200075);

UPDATE SAN_PHAM
SET MA_VOUCHER = 100011
WHERE MASP IN (200004, 200005, 200012, 200015, 200017, 200019, 200021, 200029, 200030, 200034, 200045, 200051); 

UPDATE SAN_PHAM
SET MA_VOUCHER = 100012
WHERE MASP IN (200006, 200008, 200009, 200011, 200014, 200016, 200018, 200023, 200025, 200026, 200031, 200032); 

UPDATE SAN_PHAM
SET MA_VOUCHER = 100013
WHERE MASP IN (200060, 200061, 200064, 200065, 200070, 200077, 200078); 

UPDATE SAN_PHAM
SET MA_VOUCHER = 100014
WHERE MASP IN (200080, 200079, 200050, 200052, 200057, 200053, 200059); 

--
INSERT INTO DANH_GIA (MAKH, MASP, NOI_DUNG, NGAY_DANG, SAO) 
VALUES 
(1000000, 200000, N'Tạm ổn', '2022-06-30 11:05:24', 4),
(1000012, 200000, N'Sản phẩm giống hình, chất lượng tốt', '2022-03-15 15:09:37', 5),
(1000005, 200000, N'Chất lượng sản phẩm tuyệt vời', '2022-06-30 9:19:31', 5),
(1000002, 200001, N'Chất lượng sản phẩm tuyệt vời', '2022-05-21 13:17:32', 5),
(1000003, 200001, N'Giao hàng nhanh sản phẩm đúng mẫu giá cả hợp lý đóng gói kĩ càng!', '2022-01-27 14:27:30', 5),
(1000004, 200001, N'hàng tốt giá rẻ chó nhà mình rất thích', '2022-04-28 12:12:39', 5),
(1000013, 200002, N'Giao hàng nhanh, gói hàng cẩn thận.', '2022-04-13 15:02:19', 5),
(1000017, 200002, N'chất lượng tốt', '2022-02-23 17:05:16', 5),
(1000010, 200003, N'Giao nhanh , đúng sản phảm , đóng gói cẩn thận', '2022-02-23 17:05:16', 5),
(1000001, 200004, N'Đóng gói sản phẩm chắc chắn mọi người nên mua hợp với giá tiền', '2022-07-23 7:55:14', 5),
(1000003, 200004, N'Sản phẩm tốt, sẽ ủng hộ lần sau. Giao hàng nhanh, Shop uy tín….', '2022-06-21 12:35:44', 5),
(1000006, 200004, N'rất đáng tiền', '2022-04-24 14:32:24', 5),
(1000006, 200005, N'Đã nhận được hàng. Giao hàng rất nhanh', '2022-05-14 11:12:44', 5),
(1000021, 200005, N'Sản phẩm rất là tuyệt.', '2022-05-24 13:17:35', 5),
(1000016, 200006, N'Sản phẩm nói chung là chất lượng ổn, giao hàng nhanh', '2022-04-12 14:27:25', 4),
(1000023, 200006, N'Sản phẩm tuyệt vời', '2022-05-24 16:17:35', 5),
(1000030, 200007, N'Giao hàng nhanh', '2022-05-21 12:15:32', 5),
(1000026, 200008, N'Sản phẩm rất thích hợp cho thú cưng', '2022-04-13 14:25:17', 5),
(1000015, 200008, N'Giao hàng nhanh, đã đặt nhiều lần, chất lượng sản phầm ổn định.', '2022-04-17 14:25:21', 5),
(1000006, 200008, N'giá hợp lí', '2022-05-23 14:25:24', 5),
(1000019, 200008, N'Shop giao hàng nhanh, đóng gói đẹp và rất chắc chắn, nên mua', '2022-06-07 14:25:32', 5),
(1000009, 200008, N'chất lượng tạm ổn', '2022-06-19 14:25:48', 4),
(1000032, 200009, N'chất lượng tốt', '2022-06-29 15:15:44', 5),
(1000027, 200010, N'Chất lượng sản phẩm tuyệt vời', '2022-05-24 16:25:24', 5),
(1000031, 200010, N'thức ăn hợp khẩu vị chó nhà mình.giao hàng nhanh.', '2022-05-30 14:24:41', 5),
(1000007, 200011, N'Shop gói hàng cẩn thận', '2022-04-23 12:42:16', 5),
(1000007, 200012, N'rẻ,mà chất lượng', '2022-04-25 15:41:36', 5),
(1000008, 200013, N'Giao hàng nhanh, chất lượng tốt', '2022-06-15 13:41:32', 5),
(1000008, 200014, N'khá tốt, gói hàng cẩn thận', '2022-06-12 12:14:22', 5),
(1000025, 200015, N'Shop giao hàng nhanh, gói sản phẩm cẩn thận, rất đáng để mua', '2022-07-01 14:12:32', 5),
(1000000, 200015, N'Hàng chất lượng tốt đóng gói cẩn thận , mình hài lòng với sản phẩm', '2022-07-24 11:52:22', 5),
(1000004, 200016, N'thương hiệu rất uy tín nên mình tin dùng', '2022-01-24 14:24:24', 5),
(1000006, 200016, N'Hàng chuẩn như hình ạ', '2022-02-13 14:24:29', 5),
(1000009, 200016, N'Hàng về đủ số lượng,đóng gói kĩ càng,mèo nhà mình rất thích ăn nha', '2022-03-18 21:18:48', 5),
(1000013, 200016, N'giá của shop hợp lý, ship nhanh', '2022-04-10 9:55:22', 5),
(1000018, 200016, N'Chất lượng sản phẩm tuyệt vời', '2022-04-28 12:25:35', 5),
(1000022, 200016, N'Mèo ăn ngon lành luôn, ăn hết veo, em sẽ ủng hộ tiếp ạ', '2022-05-13 11:12:24', 5),
(1000026, 200016, N'Rất tuyệt vời. Đóng gói kĩ lưỡng', '2022-05-29 8:32:42', 5),
(1000027, 200016, N'Rất hài lòng về sản phẩm', '2022-06-21 12:34:22', 5),
(1000033, 200016, N'Mèo nhà mình ăn không hợp', '2022-07-08 19:27:32', 3),
(1000029, 200016, N'Pate ngon bé mèo rất thích, giá cả hợp lý, shop giao đủ số lượng.Sẽ ủng hộ tiếp', '2022-07-18 18:21:36', 5),
(1000014, 200017, N'Giao hàng đầy đủ, sẽ ủng hộ tiếp lần sau.', '2022-06-19 14:25:58', 5),
(1000018, 200018, N'Mèo nhà mình ăn rất thích, giao hàng nhanh', '2022-06-12 15:14:22', 5),
(1000019, 200018, N'Shop giao hàng nhanh chóng. Đủ số lượng', '2022-05-29 8:35:42', 5),
(1000029, 200019, N'chất lượng tốt', '2022-04-17 14:25:25', 5),

(1000012, 200020, N'Hàng chất lượng lắm ạ', '2022-07-17 18:25:55', 5),
(1000015, 200020, N'Sản phẩm dùng rất ok nha', '2022-04-27 17:12:29', 5),
(1000026, 200021, N'Hàng đẹp còn rẻ nữa ạ, mọi người nên mua nhé ', '2022-05-27 13:24:32', 5),
(1000029, 200021, N'Giao hàng nhanh, sản phẩm đẹp màu sắc rất ưng ý mình', '2022-06-27 18:35:25', 5),
(1000032, 200021, N'Giao hàng nhanh , đúng sản phẩm , đóng gói cẩn thận , sẽ ủng hộ thêm', '2022-05-29 10:55:24', 5),
(1000014, 200022, N'Rất hài lòng với sản phẩm', '2022-04-03 12:23:35', 5),
(1000017, 200022, N'dễ lắp ráp, chắc chắn', '2022-04-26 16:12:29', 5),
(1000019, 200022, N'Shop giao nhanh lắm, gói hàng cũng cẩn thận nữa, hàng đẹp hài lòng.', '2022-05-09 10:32:19', 5),
(1000005, 200022, N'Sp ok, giao hàng nhanh, đóng gói đẹp mắt, gọn gàng', '2022-05-27 19:42:27', 5),
(1000009, 200022, N'Shop giao nhanh, đúng mẫu', '2022-06-14 21:25:29', 5),
(1000007, 200022, N'Tuyệt vời sản phẩm chất lượng dễ lắp ráp', '2022-06-28 20:29:52', 5),
(1000028, 200022, N'Hàng đẹp, giao nhanh, đúng màu, đúng mẫu, rất đáng tiền', '2022-07-14 18:00:47', 5),
(1000017, 200023, N'Hàng giao cũng nhanh, bọc hàng ok, hàng chuẩn, sịn', '2022-05-13 11:16:24', 5),
(1000019, 200023, N'Shop giao hàng rất nhanh, sản phẩm chắc chắn. Lắp ráp khá tiện lợi!!!', '2022-05-13 11:16:24', 5),
(1000005, 200024, N'Hàng về đủ, đẹp, lắp ghép khá dễ và chắc chắn', '2022-05-14 09:08:24', 5),
(1000002, 200024, N'Đã nhận hàng chưa bóc , shop có bọc chống sốc , rất yên tâm k lo bị vỡ', '2022-05-23 15:16:23', 5),
(1000016, 200024, N'Sản phẩm rất ok', '2022-07-03 21:46:28', 5),
(1000011, 200033, N'Hơi nhiều chỉ thừa', '2022-07-05 20:58:28', 4),
(1000014, 200033, N'Đẹp lắm, y như hình luôn. Êm ấm', '2022-07-13 22:25:08', 5),
(1000001, 200034, N'Nệm ấm, lông khá mềm', '2022-07-18 13::28', 5),
(1000005, 200034, N'Size rất vừa với 2 bé nhà mình. Chất rất là êm, mềm', '2022-07-26 21:46:28', 5),
(1000019, 200034, N'Chất lượng rất ok. Giá cả lại hợp lý', '2022-08-01 21:46:28', 5),
(1000025, 200035, N'Sp đẹp đáng tiền mua', '2022-05-02 21:46:28', 5),
(1000029, 200036, N'Áo rẻ mua cũng khá ổn', '2022-06-14 19:06:02', 5),
(1000005, 200036, N'Bé nhà mình mặc lên rất xinh', '2022-02-10 11:22:09', 5),
(1000014, 200036, N'Áo vải mỏng dễ rách', '2022-03-09 07:41:23', 4),
(1000032, 200038, N'Sản phẩm khá oke và đẹp', '2022-07-17 16:15:24', 5),
(1000012, 200038, N'Shop đóng gói đẹp chắc chắn. Giao hàng rất nhanh.', '2022-07-22 14:58:32', 5),
(1000031, 200041, N'Giao hàng nhanh sản phẩm chắc chắn chất lượng tốt', '2022-07-03 17:03:36', 5),
(1000009, 200041, N'Chất lượng oke lắm luôn ', '2022-05-12 13:43:24', 5),
(1000007, 200042, N'Sp đẹp đáng tiền mua', '2022-06-28 19:51:38', 5),
(1000017, 200044, N'Túi đẹp, rẻ ,bọc hàng cẩn thận', '2022-07-23 06:34:38', 5),
(1000018, 200044, N' Hàng tốt hơn cả sự mong đợi', '2022-07-29 11:46:38', 5),
(1000016, 200045, N'Cặp đựng đẹp, bao bọc nilon cẩn thận, giá sản phẩm hợp lí rất hài lòng với sản phẩm', '2022-07-04 18:14:38', 5),
(1000015, 200048, N'Chất liệu thoáng, mềm mại, giúp bé dog dễ chịu, dễ thở.', '2022-06-28 19:22:15', 5),
(1000005, 200048, N'Sản phẩm tốt, chắc chắn nhưng hơi khó buộc một tí, giao hàng nhanh', '2022-07-14 22:09:18', 5),
(1000006, 200048, N'giao hàng đầy đủ, dây đẹp chắc chắn ok lắm nha, lần sau sẽ ủng hộ', '2022-06-28 15:12:52', 5),
(1000003, 200049, N'Bé nhà mình 2.8kg đeo vừa xinh, thoải mái. Nên mua ạ', '2022-05-25 18:39:31', 5),
(1000001, 200049, N'Vòng nhẹ, mềm nên mèo đeo thích ứng nhanh, không bị khó chịu', '2022-06-01 01:26:38', 5),
(1000000, 200049, N'Phù hợp vs giá tiền đeo rất xinh, giao hàng nhanh', '2022-07-31 01:26:08', 5),
(1000022, 200049, N'mn nên mua loại này sử dụng cũng được, mọi người có thể mua về trải nghiệm, mình thì thấy ok', '2022-08-02 16:24:28', 5),
(1000011, 200051, N'Đồ xinh lắm ạ, này để cho các bé thú chơi thì bền luôn', '2021-12-01 23:06:08', 5),
(1000018, 200053, N'chất liệu khá cứng, khá đẹp', '2022-07-01 18:14:02', 4),
(1000019, 200053, N'Đóng gói sản phẩm rất chi là tốt , giao hàng rất là nhanh , hàng ko lỗi lầm', '2022-07-11 17:43:06', 5),
(1000020, 200053, N'Chất lượng xịn xò trong tầm giá.giao hàng nhanh', '2022-06-21 13:40:12', 5),
(1000010, 200061, N'Sản phẩm ok y như mô tả, đóng gói cẩn thận', '2022-06-05 22:25:15', 5),
(1000007, 200061, N'Hàng đẹp, rẻ, xinh, đóng gói rất chắc chắn luôn', '2022-05-06 14:26:17', 5),
(1000009, 200061, N'Giao hàng nhanh, chất lượng hài lòng! Sẽ ủng hộ đợt sau ạ', '2022-05-15 13:03:21', 5),
(1000026, 200061, N'chó nhà mình rất thích luôn', '2022-03-03 21:06:26', 5),
(1000024, 200068, N'Cắt khá xinh , sắc nữa ncl chất lg sp ôk không chê được', '2022-04-20 19:13:29', 5),
(1000023, 200068, N'quá ok luôn á mn, mà còn rẻ nữaa nên mua nhaaa', '2022-02-28 21:17:37', 5),
(1000021, 200068, N'Kiềm cắt tốt, đẹp lắm ạ', '2021-12-21 12:22:42', 5),

(1000028, 200069, N'sản phẩm dùng tốt', '2021-11-15 20:41:31', 5),
(1000027, 200069, N'Chất lượng sản phẩm tuyệt vời', '2021-10-13 16:01:23', 5),
(1000026, 200071, N'Hàng giao đúng mẫu, chất lượng cũng không có gì để chê', '2022-07-14 23:38:42', 5),
(1000025, 200071, N'Đóng gói hàng ok lắm ạ thơm nứa nên mua nhaaaaaa.', '2022-06-30 19:26:37', 5),
(1000024, 200071, N'Sản phẩm nhận ok ạ. Giao hàng hơi lâu nhưng không sao ạ. Cảm ơn shop đã đóng gói và gửi hàng cẩn thận', '2022-06-23 00:13:14', 5),
(1000023, 200071, N'Shop giao hàng nhanh, đóng gói cẩn thận, mùi sữa tắm thơm lắm nha', '2022-07-05 10:48:52', 5),
(1000022, 200071, N'Đóng gói kĩ lắm nha mn , chai nào cũng thơm lưu hương lâu', '2022-06-12 21:47:23', 5),
(1000020, 200073, N'mùi thơm, rất dễ chịu', '2022-06-19 14:55:03', 5),
(1000019, 200073, N'Sản phẩm ok', '2022-05-17 11:14:17', 4),
(1000018, 200074, N'Hàng rẻ mà giao hàng siêu nhanh, mình mua mấy lần rồi và sẽ còn mua tiếp', '2022-05-10 11:48:49', 5),
(1000017, 200074, N'Thấm hút tốt, không tràn ra ngoài, uy tín lắm luôn, mn yên tâm mua hàng nha ^^', '2022-06-06 11:58:25', 5),
(1000011, 200074, N'Shop đóng hàng kĩ lưỡng, chắc chắn gửi hàng rất nhanh và gọn gàng luôn ủng hộ shop', '2022-05-19 11:55:41', 5),
(1000013, 200074, N'Bỉm tốt thấm hút nhanh sạch sẽ. Mèo đẻ mèo con đều nên sử dụng nha', '2022-07-23 20:36:36', 5),
(1000012, 200077, N'Shop ship cực nhanh, đóng hàng đủ, gói hàng cẩn thận. Đã mua rất nhiều lần rồi mọi người ạ.', '2022-07-23 20:36:18', 5),
(1000004, 200077, N'cát phù hợp giá tiền', '2022-07-09 09:05:07', 5),
(1000007, 200077, N'Y như hình nên yên tâm, chưa dùng nên mik chưa bk chất lượng ra sao nhưng nhìn chung rất ổn áp', '2022-07-15 13:11:32', 5),
(1000009, 200077, N'Cát dùng đc lâu , ko có mùi hôi nhìu', '2022-06-26 11:48:12', 5),
(1000001, 200077, N'Mèo nhà mình thích lắmmmmmm; giao hàng nhanh chóng, sẽ ủng hộ sốp lần sau', '2022-06-27 21:05:17', 5),
(1000000, 200077, N'Giá rẻ và mùi cát thơm . Rất đáng tiền , lần sau sẽ mua tiếp', '2022-07-17 21:31:57', 5),
(1000002, 200077, N'Có hơi nhỏ so với tưởng tượng 1 chút nhưng sản phẩm khá tốt hơi bụi, vón cục nhanh', '2022-07-05 07:48:02', 5),
(1000017, 200077, N'ship nhanh , giá rẻ', '2022-06-27 09:10:40', 5),
(1000016, 200078, N'sản phẩm dùng tốt', '2021-07-29 00:58:52', 5),
(1000015, 200078, N'Hàng tốt hơn cả sự mong đợi', '2021-08-26 16:58:51', 5),
(1000030, 200078, N'sử dụng rất hiệu quả, đáng tiền', '2021-09-10 14:48:42', 5),
(1000031, 200079, N'Chất lượng lắm ạ', '2021-10-06 09:45:13', 5),
(1000032, 200079, N'giao hàng rất nhanh, đóng gói cẩn thận, sản phẩm tốt', '2021-11-19 11:01:15', 5),
(1000033, 200080, N'Shop giao nhanh, đủ sản phẩm', '2021-12-13 09:32:44', 5),
(1000008, 200080, N'Giá rẻ, chất lượng, giao hàng nhanh chóng', '2022-07-03 22:26:27', 5),
(1000009, 200080, N'Chắc mùi vị thơm ngon nên mình đưa 2 bé nhà mình ăn luôn như ăn kẹo mà không cần trộn với đồ ăn hay ép uống.', '2022-07-19 10:05:09', 5),
(1000007, 200081, N'Tốt', '2022-08-02 12:48:41', 4),
(1000006, 200081, N'khay chất lượng tạm ổn ', '2022-07-05 12:40:07', 5),
(1000005, 200081, N'Hàng xịn xò, màu đẹp, đóng gói cẩn thận', '2022-07-28 19:25:38', 5),
(1000004, 200082, N'Khay to hơn mik nghĩ. Hơi mỏng nhưng chắc chắn. Sẽ ủng hộ shop.', '2022-06-30 21:42:00', 5),
(1000014, 200082, N'Sản phẩm tốt, cứng cáp đáng tiền mua nha. Đóng gói chắc lắm không sợ vỡ hay móp méo nha.', '2022-06-30 07:34:51', 5),
(1000017, 200082, N'Khay đẹp nha mọi ng. Mỗi tội mấy con chó nhà mình nó chưa biết đi vệ sinh vào khay :(', '2022-06-29 22:45:32', 5);

-- 300, 1
INSERT INTO STORE_ADMIN (EMAIL, MAT_KHAU) 
VALUES 
('admin1@gmail.com', '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM='),
('admin2@gmail.com', '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM='),
('admin3@gmail.com', '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM='),
('admin4@gmail.com', '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM='),
('admin5@gmail.com', '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM='),
('admin6@gmail.com', '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM='),
('admin7@gmail.com', '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM='),
('admin8@gmail.com', '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM='),
('admin9@gmail.com', '4H7hBaFiUivUeiqRG9rjBUX+9ER5PmcoLh+/UixwYJM=');

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
BEGIN
    INSERT INTO
        trang_thai_dh (madh,trang_thai)
        VALUES(new.madh,new.trang_thai);

           RETURN new;
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
		when new.trang_thai = 'ĐÃ GIAO THÀNH CÔNG' then
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
			   UPDATE san_pham as sp
			    set tong_da_ban = tong_da_ban + (select so_luong_mua from chi_tiet ct where sp.masp = ct.masp)
			    where sp.masp in (select masp from chi_tiet);
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
				    set so_luong_ton = so_luong_ton - (select so_luong_mua from chi_tiet ct where kho.masp = ct.masp),
				    	so_luong_da_ban = so_luong_da_ban + (select so_luong_mua from chi_tiet ct where kho.masp = ct.masp)
				    where kho.macn = new.macn
				    and kho.masp in (select masp from chi_tiet)
				    returning *
			    )
			    update voucher v
			    set so_luong_voucher = so_luong_voucher - 1
			    where v.ma_voucher = new.ma_voucher;
		
		when (new.trang_thai = 'HỦY ĐƠN HÀNG' 
		and (old.trang_thai = 'ĐÃ XÁC NHẬN' or old.trang_thai = 'ĐANG GIAO')) then 
				with chi_tiet as(
				   		select * 
				   		from chi_tiet_don_hang ctdh 
				   		where new.madh = ctdh.madh 
				 ), step2 as (
					UPDATE kho 
				    set so_luong_ton = so_luong_ton + (select so_luong_mua from chi_tiet ct where kho.masp = ct.masp),
				    	so_luong_da_ban = so_luong_da_ban - (select so_luong_mua from chi_tiet ct where kho.masp = ct.masp)
				    where kho.macn = new.macn
				    and kho.masp in (select masp from chi_tiet)
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



















