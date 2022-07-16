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
	MA_CAP_BAC INT,
	TENKH TEXT,
	EMAIL_KH VARCHAR(60) NOT NULL UNIQUE,
	SDT_KH CHAR(10),
	NGSINH_KH DATE,
	TONG_DIEM_TICH_LUY INT DEFAULT 0,
	MAT_KHAU VARCHAR(50) NOT NULL,
	KH_TOKEN VARCHAR(100),
	CHECK_SD_VOUCHER BOOL,
	THOI_GIAN_DK timestamp default current_timestamp,
	ACTIVATE BOOL default true,

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
	NGAY_LAP timestamp NOT NULL,
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
	SO_NHA_DUONG TEXT,
	PHUONG_XA TEXT,
	QUAN_TP TEXT,
	TP_TINH TEXT,
	TRANG_THAI TEXT,
	THOI_GIAN timestamp default current_timestamp,
	DIEM_TICH_LUY numeric  GENERATED ALWAYS AS (0.001*PHI_SAN_PHAM - 0.001*PHI_GIAM) STORED,
	

	CONSTRAINT FK_DH_KH FOREIGN KEY (MAKH)  REFERENCES KHACH_HANG(MAKH),
	CONSTRAINT FK_DH_CN  FOREIGN KEY (MACN)  REFERENCES CHI_NHANH (MACN),
	CONSTRAINT FK_DH_VOUCHER FOREIGN KEY (MA_VOUCHER) REFERENCES VOUCHER(MA_VOUCHER),
	CONSTRAINT FK_DH_THANH_TOAN FOREIGN KEY (HINH_THUC_THANH_TOAN) REFERENCES HINH_THUC_THANH_TOAN(MAHT),
	CONSTRAINT FK_DH_GIAO_HANG FOREIGN KEY  (HINH_THUC_GIAO_HANG) REFERENCES HINH_THUC_GIAO_HANG(MAHT)
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
	GIAM_GIA INT DEFAULT 0,
	THANH_TIEN_MUA NUMERIC,

	CONSTRAINT FK_CTDH_DH FOREIGN KEY (MADH) REFERENCES DON_HANG(MADH),
	CONSTRAINT FK_CTDH_SP FOREIGN KEY (MASP) REFERENCES SAN_PHAM(MASP),
	CONSTRAINT FK_CTDH_VOUCHER FOREIGN KEY (MA_VOUCHER) REFERENCES VOUCHER(MA_VOUCHER),
	CONSTRAINT PK_DH_SP PRIMARY KEY (MADH, MASP)
);

CREATE TABLE TRANG_THAI_DH (
	MADH INT,
	TRANG_THAI TEXT,
	THOI_GIAN TIMESTAMP,
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
('PAYPAL','THANH TOÁN BẰNG VÍ ĐIỆN TỬ PAYPAL');

INSERT INTO HINH_THUC_GIAO_HANG(MAHT, TEN_HINH_THUC) 
VALUES 
('GHN',   'GIAO HANG NHANH'),
('GHTK_NORM',  'GIAO HANG TIET KIEM THUONG'), 
('GHTK_FAST','GIAO HANG TIET KIEM FAST');

-- 1000000, 1
INSERT INTO KHACH_HANG (MA_CAP_BAC, TENKH, EMAIL_KH, SDT_KH, TONG_DIEM_TICH_LUY, MAT_KHAU, ACTIVATE) 
VALUES 
(1, N'Nguyễn Thị Ngọc Diệu', 'ntnd1@gmail.com',    '0857916579', 0, 'mk123', true),
(3, N'Lê Thị Phương Linh', 'ltpl2@gmail.com',      '0857916578', 1609, 'mk123', true),
(1, N'Phan Khải Đông', 'pkd3@gmail.com',           '0857916577', 0, 'mk123', true),
(2, N'Bùi Đăng Khoa', 'bdk4@gmail.com',            '0857916576', 329, 'mk123', true),
(1, N'Tống Thảo Nhi', 'ttn5@gmail.com',            '0857916575', 67, 'mk123', true),
(1, N'Nguyễn Thị Bích Phương', 'ntbp6@gmail.com',  '0857916574', 0, 'mk123', true),
(1, N'Trần Thị Lan Anh', 'ttla7@gmail.com',        '0857916573', 0, 'mk123', true),
(3, N'Nguyễn Như Ngọc', 'nnn8@gmail.com',          '0857916572', 1654, 'mk123', true),
(1, N'Nguyễn Phạm Mỹ Duyên', 'npmd9@gmail.com',    '0157916571', 0, 'mk123', true),
(1, N'Huỳnh Nguyễn Thùy Nhiên', 'hntn10@gmail.com','0557916570', 49, 'mk123', true),
(2, N'Nguyễn Quang Trường', 'nqt11@gmail.com',     '0857916599', 765, 'mk123', true),
(1, N'Hà Đức Trọng', 'hdt12@gmail.com',            '0857916589', 0, 'mk123', true),
(2, N'Trương Nguyên Thảo', 'tnt13@gmail.com',      '0957916579', 652, 'mk123', true),
(1, N'Nguyễn Tuyết Anh', 'nta14@gmail.com',        '0457916569', 0, 'mk123', true),
(1, N'Lê Thị Tú Loan', 'lttl15@gmail.com',         '0857916559', 102, 'mk123', true),
(1, N'Nguyễn Lê Tuấn Minh', 'nltm16@gmail.com',       '0817916539', 0, 'mk123', true),
(2, N'Võ Quang Duy', 'vqd17@gmail.com',               '0837916519', 498, 'mk123', false),
(1, N'Trương Nguyễn Thảo Nguyên', 'nttn18@gmail.com', '0847916529', 123, 'mk123', false),
(1, N'Nguyễn Thị Thanh An', 'ntta19@gmail.com',       '0857918579', 46, 'mk123', false),
(2, N'Nguyễn Thị Hoài Linh', 'nthl20@gmail.com',      '0867916779', 549, 'mk123', false),
(3, N'Phan Quang Hiếu', 'pqh21@gmail.com',            '0877916549', 1221, 'mk123', false),
(1, N'Võ Như Quỳnh', 'vnq22@gmail.com',               '0887916569', 0, 'mk123', false),
(1, N'Huỳnh Thục Quyên', 'htq23@gmail.com',           '0807916579', 53, 'mk123', false),
(1, N'Lê Vũ Thảo Hiền', 'lvth24@gmail.com',           '0815916579', 0, 'mk123', false),
(1, N'Nguyễn Bá Quân', 'nbq25@gmail.com',             '0852916579', 46, 'mk123', true),
(1, N'Trần Vương Quỳnh Trân', 'tvqt26@gmail.com',     '0858916579', 0, 'mk123', false),
(1, N'Nguyễn Minh Thảo', 'nmt28@gmail.com',           '0850916789', 0, 'mk123', true),
(2, N'Nguyễn Trung Anh', 'nta29@gmail.com',           '0851916519', 345, 'mk123', true),
(1, N'Nguyễn Thị Kim Anh', 'ntka30@gmail.com',        '0857116579', 0, 'mk123', true),
(1, N'Huỳnh Thị Hồng Phấn', 'hthp31@gmail.com',       '0157952579', 0, 'mk123', true),
(1, N'Bùi Thị Kim Ngân', 'btkn32@gmail.com',          '0757916579', 0, 'mk123', true),
(1, N'Phan Tường Vy', 'ptv33@gmail.com',              '0957918879', 0, 'mk123', true),
(2, N'Nguyễn Thương Thương', 'ntt34@gmail.com',       '0857926879', 323, 'mk123', false),
(1, N'Lê Thị Minh Tuyền', 'ltmt35@gmail.com',         '0867116579', 23, 'mk123', false);

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

-- 100000, 1
INSERT INTO VOUCHER (PHAN_TRAM_GIAM_GIA, GIAM_TOI_DA, TG_BAT_DAU, TG_KET_THUC, PHAN_LOAI) 
VALUES 
(5, 1000, '2022-06-20 00:00:00-07', '2022-07-01 00:00:00-07', N'DH'),
(7, 100, '2022-06-25 00:00:00-07', '2022-07-01 00:00:00-07', N'DH'),
(5, 500, '2022-06-30 00:00:00-07', '2022-07-20 00:00:00-07', N'DH'),
(10, 500, '2022-07-01 00:00:00-07', '2022-07-10 00:00:00-07', N'SP'),
(20, 500, '2022-07-05 00:00:00-07', '2022-07-31 00:00:00-07', N'SP');

--10, 1
INSERT INTO LOAI_HANG (TEN_LH) 
VALUES 
(N'Thức ăn'),
(N'Mỹ phẩm và làm đẹp'),
(N'Thời trang'),
(N'Đồ chơi'),
(N'Y tế'),
(N'Chuồng thú');

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

-- 500000, 1
INSERT INTO DON_HANG (MAKH, MACN, PHI_SAN_PHAM, PHI_VAN_CHUYEN, HINH_THUC_THANH_TOAN, HINH_THUC_GIAO_HANG, SO_NHA_DUONG, PHUONG_XA, QUAN_TP, TP_TINH, TRANG_THAI) 
VALUES 
(1000000, 200, 279000, 35000, N'COD' ,'GHN', N'227 Nguyễn Văn Cừ', N'7', N'5', N'HCM', N'ĐÃ XÁC NHẬN'),
(1000003, 208, 327000, 20000, N'MOMO','GHN', N'324 Nguyễn Văn Linh', N'2', N'7', N'HCM', N'ĐÃ GIAO'),
(1000008, 203, 175000, 35000, N'MOMO','GHN', N'112 Nguyễn Văn Trỗi', N'6', N'Đà Lạt', N'Lâm Đồng', N'ĐANG GIAO'),
(1000001, 201, 612500, 45000, N'COD' ,'GHTK_NORM', N'37 Nguyễn Thị Minh Khai', N'6', N'7', N'Hà Nội', N'ĐÃ HỦY'),
(1000005, 200, 535000, 30000, N'COD' ,'GHTK_NORM', N'51 Hùng Vương', N'5', N'Vũng Tàu', N'Bà Rịa - Vũng Tàu', N'CHỜ XÁC NHẬN'),
(1000012, 205, 564500, 45000, N'MOMO','GHN', N'147 Nguyễn Tri Phương', N'4', N'5', N'HCM', N'ĐÃ GIAO'),
(1000002, 205, 310000, 20000, N'MOMO','GHN', N'50 Võ Văn Kiệt', N'An Lạc', N'Bình Tân', N'HCM', N'CHỜ XÁC NHẬN'),
(1000002, 208, 410000, 20000, N'MOMO','GHN', N'491 Hậu Giang', N'11', N'6', N'HCM', N'CHỜ XÁC NHẬN'),
(1000002, 203, 460000, 20000, N'MOMO','GHTK_FAST', N'9 Trần Hưng Đạo', N'Nguyễn Thái Bình', N'1', N'HCM', N'ĐANG GIAO'),
(1000001, 202, 420000, 45000, N'COD' ,'GHN', N'37 Nguyễn Thị Minh Khai', N'6', N'7', N'Hà Nội', N'CHỜ XÁC NHẬN'),
(1000001, 205, 480000, 45000, N'COD' ,'GHN', N'37 Nguyễn Thị Minh Khai', N'6', N'7', N'Hà Nội', N'CHỜ XÁC NHẬN');

--
INSERT INTO CHI_TIET_DON_HANG (MADH, MASP, MA_VOUCHER, SO_LUONG_MUA, THANH_TIEN_MUA) 
VALUES 
(500000, 200000, 100003, 2, 279000),
(500001, 200005, 100003, 1, 207000),
(500001, 200012, NULL, 3, 120000),
(500002, 200020, NULL, 1, 175000),
(500003, 200010, NULL, 4, 140000),
(500003, 200047, 100003, 1, 472500),
(500004, 200018, 100004, 1, 140000),
(500004, 200034, NULL, 1, 395000),
(500005, 200008, 100003, 3, 94500),
(500005, 200029, 100003, 1, 360000),
(500005, 200080, NULL, 2, 110000),
(500006, 200000, NULL, 2, 310000),
(500007, 200010, NULL, 1, 35000),
(500007, 200001, NULL, 1, 185000),
(500007, 200002, NULL, 2, 190000),
(500008, 200005, NULL, 2, 460000),
(500009, 200020, NULL, 1, 175000),
(500009, 200047, NULL, 1, 245000),
(500010, 200040, NULL, 1, 180000),
(500010, 200050, NULL, 1, 300000);

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
(200000, 200, 142, 52),
(200000, 201, 159, 21),
(200000, 202, 191, 53),
(200000, 203, 194, 61),
(200000, 204, 184, 28),
(200000, 205, 89, 98),
(200000, 206, 145, 42),
(200000, 207, 198, 14),
(200000, 208, 112, 81),

(200001, 200, 113, 34),
(200001, 201, 182, 63),
(200001, 202, 138, 25),
(200001, 203, 121, 93),
(200001, 204, 143, 28),
(200001, 205, 134, 59),
(200001, 206, 142, 18),
(200001, 207, 131, 81),
(200001, 208, 173, 15),

(200002, 200, 142, 115),
(200002, 201, 134, 43),
(200002, 202, 118, 61),
(200002, 203, 184, 82),
(200002, 204, 138, 33),
(200002, 205, 134, 48),
(200002, 206, 138, 37),
(200002, 207, 182, 41),
(200002, 208, 173, 52),

(200003, 200, 127, 114),
(200003, 201, 147, 63),
(200003, 202, 115, 91),
(200003, 203, 174, 83),
(200003, 204, 81, 133),
(200003, 205, 42, 148),
(200003, 206, 472, 37),
(200003, 207, 184, 41),
(200003, 208, 71, 82),

(200004, 200, 127, 114),
(200004, 201, 147, 63),
(200004, 202, 115, 91),
(200004, 203, 174, 83),
(200004, 204, 81, 133),
(200004, 205, 42, 148),
(200004, 206, 472, 37),
(200004, 207, 184, 41),
(200004, 208, 71, 82),

(200005, 200, 127, 114),
(200005, 201, 147, 63),
(200005, 202, 115, 91),
(200005, 203, 174, 83),
(200005, 204, 81, 133),
(200005, 205, 42, 148),
(200005, 206, 472, 37),
(200005, 207, 184, 41),
(200005, 208, 71, 82),

(200006, 200, 127, 114),
(200006, 201, 147, 63),
(200006, 202, 115, 91),
(200006, 203, 174, 83),
(200006, 204, 81, 133),
(200006, 205, 42, 148),
(200006, 206, 472, 37),
(200006, 207, 184, 41),
(200006, 208, 71, 82),

(200007, 200, 127, 114),
(200007, 201, 147, 63),
(200007, 202, 115, 91),
(200007, 203, 174, 83),
(200007, 204, 81, 133),
(200007, 205, 42, 148),
(200007, 206, 472, 37),
(200007, 207, 184, 41),
(200007, 208, 71, 82),

(200008, 200, 127, 114),
(200008, 201, 147, 63),
(200008, 202, 115, 91),
(200008, 203, 174, 83),
(200008, 204, 81, 133),
(200008, 205, 42, 148),
(200008, 206, 472, 37),
(200008, 207, 184, 41),
(200008, 208, 71, 82),

(200009, 200, 127, 114),
(200009, 201, 147, 63),
(200009, 202, 115, 91),
(200009, 203, 174, 83),
(200009, 204, 81, 133),
(200009, 205, 42, 148),
(200009, 206, 472, 37),
(200009, 207, 184, 41),
(200009, 208, 71, 82),

(200010, 200, 127, 114),
(200010, 201, 147, 63),
(200010, 202, 115, 91),
(200010, 203, 174, 83),
(200010, 204, 81, 133),
(200010, 205, 42, 148),
(200010, 206, 472, 37),
(200010, 207, 184, 41),
(200010, 208, 71, 82),

(200020, 202, 100, 82),
(200025, 202, 100, 290),
(200040, 202, 100, 60),
(200047, 202, 150, 82),
(200050, 202, 130, 87),

(200020, 205, 71, 112),
(200025, 205, 87, 50),
(200040, 205, 171, 82),
(200047, 205, 251, 55),
(200050, 205, 90, 200);

--
INSERT INTO DANH_GIA (MAKH, MASP, NOI_DUNG, NGAY_DANG, SAO) 
VALUES 
(1000003, 200005, N'Tốt', '2022-03-30 12:15:26', 5),
(1000003, 200012, N'Tốt', '2022-03-30 12:16:25', 5),
(1000012, 200009, N'Tốt', '2022-05-26 18:32:06', 5),
(1000012, 200028, N'Tốt', '2022-05-26 18:33:07', 5),
(1000012, 200080, N'Tốt', '2022-05-26 18:34:08', 5);

-- 300, 1
INSERT INTO STORE_ADMIN (EMAIL, MAT_KHAU) 
VALUES 
('admin1@gmail.com', 'ADMIN'),
('admin2@gmail.com', 'ADMIN'),
('admin3@gmail.com', 'ADMIN'),
('admin4@gmail.com', 'ADMIN'),
('admin5@gmail.com', 'ADMIN'),
('admin6@gmail.com', 'ADMIN'),
('admin7@gmail.com', 'ADMIN'),
('admin8@gmail.com', 'ADMIN'),
('admin9@gmail.com', 'ADMIN');

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