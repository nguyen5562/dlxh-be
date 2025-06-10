import { Injectable } from '@nestjs/common';
import { DonViService } from '../don-vi/don-vi.service';
import { GioiHanDonViService } from '../gioi-han-don-vi/gioi-han-don-vi.service';
import { VungMienService } from '../vung-mien/vung-mien.service';
import { GioiHanVungMienService } from '../gioi-han-vung-mien/gioi-han-vung-mien.service';
import { PhanHoiService } from '../phan-hoi/phan-hoi.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import {
  ThongKeCauHoi,
  ThongKeDapAn,
  ThongKeDonVi,
  ThongKeGioiTinh,
  ThongKeVungMien,
} from '../../interface/thong-ke.interface';
import { CauHoiService } from '../cau-hoi/cau-hoi.service';
import { DapAnService } from '../dap-an/dap-an.service';
import { ChiTietPhanHoiService } from '../chi-tiet-phan-hoi/chi-tiet-phan-hoi.service';

@Injectable()
export class ThongKeService {
  constructor(
    private readonly donViService: DonViService,

    private readonly gioiHanDonViService: GioiHanDonViService,

    private readonly vungMienService: VungMienService,

    private readonly gioiHanVungMienService: GioiHanVungMienService,

    private readonly phanHoiService: PhanHoiService,

    private readonly nguoiDungService: NguoiDungService,

    private readonly cauHoiService: CauHoiService,

    private readonly dapAnService: DapAnService,

    private readonly chiTietPhanHoiService: ChiTietPhanHoiService,
  ) {}

  async thongKeSoPhanHoiTheoDonVi(maKhaoSat: string): Promise<ThongKeDonVi[]> {
    const donVis = await this.donViService.getAll();

    const phanHoiDocs =
      await this.gioiHanDonViService.getSoPhanHoiByMaKhaoSat(maKhaoSat);
    const mapPhanHoi = new Map<string, number>();
    for (const item of phanHoiDocs) {
      mapPhanHoi.set(
        item.ma_don_vi.toString(),
        item.so_luong_phan_hoi_hien_tai,
      );
    }

    const donViMap = new Map<string, ThongKeDonVi>();
    for (const dv of donVis) {
      donViMap.set(dv._id.toString(), {
        ma_don_vi: dv._id.toString(),
        ten_don_vi: dv.ten_don_vi,
        so_phan_hoi: mapPhanHoi.get(dv._id.toString()) || 0, // nếu không có thì gán 0
        ma_don_vi_cha: dv.ma_don_vi_cha ? dv.ma_don_vi_cha.toString() : null,
        cac_don_vi_con: [],
      });
    }

    const roots: ThongKeDonVi[] = [];
    for (const [, dv] of donViMap.entries()) {
      const maDonViCha = dv.ma_don_vi_cha;

      if (maDonViCha && donViMap.has(maDonViCha)) {
        const parent = donViMap.get(maDonViCha);
        if (parent) {
          parent.cac_don_vi_con.push(dv);
        } else {
          roots.push(dv);
        }
      } else {
        roots.push(dv);
      }
    }

    return roots;
  }

  async thongKeSoPhanHoiTheoVungMien(
    maKhaoSat: string,
  ): Promise<ThongKeVungMien[]> {
    const vungMiens = await this.vungMienService.getAll();

    const phanHoiDocs =
      await this.gioiHanVungMienService.getSoPhanHoiByMaKhaoSat(maKhaoSat);
    const mapPhanHoi = new Map<string, number>();
    for (const item of phanHoiDocs) {
      mapPhanHoi.set(
        item.ma_vung_mien.toString(),
        item.so_luong_phan_hoi_hien_tai,
      );
    }

    const vungMienMap = new Map<string, ThongKeVungMien>();
    for (const vm of vungMiens) {
      vungMienMap.set(vm._id.toString(), {
        ma_vung_mien: vm._id.toString(),
        ten_vung_mien: vm.ten_vung_mien,
        so_phan_hoi: mapPhanHoi.get(vm._id.toString()) || 0, // nếu không có thì gán 0
        ma_vung_mien_cha: vm.ma_vung_mien_cha
          ? vm.ma_vung_mien_cha.toString()
          : null,
        cac_vung_mien_con: [],
      });
    }

    const roots: ThongKeVungMien[] = [];
    for (const [, vm] of vungMienMap.entries()) {
      const maVungMienCha = vm.ma_vung_mien_cha;

      if (maVungMienCha && vungMienMap.has(maVungMienCha)) {
        const parent = vungMienMap.get(maVungMienCha);
        if (parent) {
          parent.cac_vung_mien_con.push(vm);
        } else {
          roots.push(vm);
        }
      } else {
        roots.push(vm);
      }
    }

    return roots;
  }

  async thongKeSoPhanHoiTheoGioiTinh(
    maKhaoSat: string,
  ): Promise<ThongKeGioiTinh> {
    const phanHois = await this.phanHoiService.getPhanHoiByMaKhaoSat(maKhaoSat);
    const total = phanHois.length;
    const listNguoiDung: string[] = [];
    let an_danh = 0;

    for (const p of phanHois) {
      if (p.ma_nguoi_dung) {
        listNguoiDung.push(p.ma_nguoi_dung.toString());
      } else {
        an_danh = an_danh + 1;
      }
    }

    const nguoiDungs =
      await this.nguoiDungService.getNguoiDungByListId(listNguoiDung);

    const result: ThongKeGioiTinh = {
      nam: 0,
      nu: 0,
      an_danh: an_danh,
      tong_cong: total,
    };

    for (const nd of nguoiDungs) {
      const gt = nd.gioi_tinh;
      if (gt === 'Nam') {
        result.nam++;
      } else if (gt === 'Nữ') {
        result.nu++;
      }
    }

    return result;
  }

  async thongKeTheoCauHoi(maCauHoi: string): Promise<ThongKeCauHoi> {
    const cauHoi = await this.cauHoiService.getCauHoiById(maCauHoi);
    const danhSachDapAn = await this.dapAnService.getDapAnByCauHoiId(maCauHoi);
    const chiTietPhanHoi =
      await this.chiTietPhanHoiService.getChiTietPhanHoiByCauHoiId(maCauHoi);
    const tongSoNguoiTraLoi = chiTietPhanHoi.length;

    const thongKeDapAn: ThongKeDapAn[] = [];
    const cacTraLoiText: string[] = [];

    if (cauHoi.loai_cau_hoi === 'Câu hỏi tự luận') {
      const traLoiTextMap = new Map<string, number>();
      const tatCaTraLoi: string[] = [];

      chiTietPhanHoi.forEach((ct) => {
        if (ct.tra_loi && ct.tra_loi.trim()) {
          const traLoi = ct.tra_loi.trim();
          tatCaTraLoi.push(traLoi);
          traLoiTextMap.set(traLoi, (traLoiTextMap.get(traLoi) || 0) + 1);
        }
      });

      cacTraLoiText.push(...Array.from(traLoiTextMap.keys()));

      // Chuyển Map thành array và sắp xếp theo số lượng giảm dần
      const sortedTraLoi = Array.from(traLoiTextMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([traLoi, soLuong]) => ({
          tra_loi_text: traLoi,
          so_luong_chon: soLuong,
          ti_le:
            tongSoNguoiTraLoi > 0
              ? Math.round((soLuong / tongSoNguoiTraLoi) * 10000) / 100
              : 0,
        }));

      thongKeDapAn.push(...sortedTraLoi);
    } else {
      // Câu hỏi trắc nghiệm/checkbox - thống kê theo đáp án có sẵn
      for (const dapAn of danhSachDapAn) {
        const soLuongChon = chiTietPhanHoi.filter(
          (ct) =>
            ct.ma_dap_an && ct.ma_dap_an.toString() === dapAn._id.toString(),
        ).length;

        const tiLe =
          tongSoNguoiTraLoi > 0 ? (soLuongChon / tongSoNguoiTraLoi) * 100 : 0;

        thongKeDapAn.push({
          ma_dap_an: dapAn._id.toString(),
          gia_tri_dap_an: dapAn.gia_tri,
          loai_dap_an: dapAn.loai_dap_an,
          so_luong_chon: soLuongChon,
          ti_le: Math.round(tiLe * 100) / 100, // Làm tròn 2 chữ số thập phân
        });
      }

      // Đếm số người không chọn đáp án nào (bỏ trống) - chỉ áp dụng cho câu hỏi không bắt buộc
      const soNguoiKhongTraLoi = chiTietPhanHoi.filter(
        (ct) => !ct.ma_dap_an,
      ).length;
      if (soNguoiKhongTraLoi > 0) {
        const tiLeBo =
          tongSoNguoiTraLoi > 0
            ? (soNguoiKhongTraLoi / tongSoNguoiTraLoi) * 100
            : 0;
        thongKeDapAn.push({
          gia_tri_dap_an: '(Không trả lời)',
          so_luong_chon: soNguoiKhongTraLoi,
          ti_le: Math.round(tiLeBo * 100) / 100,
        });
      }
    }

    return {
      ma_cau_hoi: maCauHoi,
      noi_dung_cau_hoi: cauHoi.noi_dung,
      loai_cau_hoi: cauHoi.loai_cau_hoi,
      bat_buoc: cauHoi.bat_buoc,
      tong_so_nguoi_tra_loi: tongSoNguoiTraLoi,
      danh_sach_dap_an: thongKeDapAn,
      cac_tra_loi_text: cacTraLoiText.length > 0 ? cacTraLoiText : undefined,
    };
  }
}
