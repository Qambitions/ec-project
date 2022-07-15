﻿
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

CREATE TABLE DON_HANG (
	MADH INT PRIMARY key GENERATED ALWAYS AS IDENTITY(START WITH 500000 INCREMENT BY 1),
	MAKH INT,
	MACN INT,
	MA_VOUCHER INT,
	PHI_SAN_PHAM NUMERIC DEFAULT 0,
	PHI_VAN_CHUYEN NUMERIC DEFAULT 0,
	PHI_GIAM NUMERIC DEFAULT 0,
	HINH_THUC_THANH_TOAN TEXT,
	TONG_PHI NUMERIC GENERATED ALWAYS AS (PHI_SAN_PHAM + PHI_VAN_CHUYEN - PHI_GIAM) STORED,
	SO_NHA_DUONG TEXT,
	PHUONG_XA TEXT,
	QUAN_TP TEXT,
	TP_TINH TEXT,
	TRANG_THAI TEXT,
	DIEM_TICH_LUY numeric  GENERATED ALWAYS AS (0.001*PHI_SAN_PHAM - 0.001*PHI_GIAM) STORED,

	CONSTRAINT FK_DH_KH FOREIGN KEY (MAKH)  REFERENCES KHACH_HANG(MAKH),
	CONSTRAINT FK_DH_CN  FOREIGN KEY (MACN)  REFERENCES CHI_NHANH (MACN),
	CONSTRAINT FK_DH_VOUCHER FOREIGN KEY (MA_VOUCHER) REFERENCES VOUCHER(MA_VOUCHER)
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
	CONG_KENH BOOL,
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
