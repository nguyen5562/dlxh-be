export interface ThongKeDapAn {
  ma_dap_an?: string;
  gia_tri_dap_an?: string;
  loai_dap_an?: string;
  so_luong_chon: number;
  ti_le: number;
  tra_loi_text?: string; // Cho câu trả lời dạng text
}

export interface ThongKeCauHoi {
  ma_cau_hoi: string;
  noi_dung_cau_hoi: string;
  loai_cau_hoi: string;
  bat_buoc: boolean;
  tong_so_nguoi_tra_loi: number;
  danh_sach_dap_an: ThongKeDapAn[];
  cac_tra_loi_text?: string[]; // Danh sách tất cả câu trả lời text
}

export interface ThongKeDonVi {
  ma_don_vi: string;
  ten_don_vi: string;
  so_phan_hoi: number;
  ma_don_vi_cha: string | null;
  cac_don_vi_con: ThongKeDonVi[];
}

export interface ThongKeVungMien {
  ma_vung_mien: string;
  ten_vung_mien: string;
  so_phan_hoi: number;
  ma_vung_mien_cha: string | null;
  cac_vung_mien_con: ThongKeVungMien[];
}

export interface ThongKeGioiTinh {
  nam: number;
  nu: number;
  an_danh: number;
  tong_cong: number;
}
