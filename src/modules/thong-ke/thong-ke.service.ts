import { Injectable } from '@nestjs/common';
import { DonViService } from '../don-vi/don-vi.service';
import { GioiHanDonViService } from '../gioi-han-don-vi/gioi-han-don-vi.service';
import { VungMienService } from '../vung-mien/vung-mien.service';
import { GioiHanVungMienService } from '../gioi-han-vung-mien/gioi-han-vung-mien.service';
import { ThongKeDonViDTO } from './dto/thong-ke-don-vi.dto';
import { ThongKeVungMienDTO } from './dto/thong-ke-vung-mien.dto';
import { ThongKeGioiTinhDTO } from './dto/thong-ke-gioi-tinh.dto';
import { PhanHoiService } from '../phan-hoi/phan-hoi.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';

@Injectable()
export class ThongKeService {
  constructor(
    private readonly donViService: DonViService,

    private readonly gioiHanDonViService: GioiHanDonViService,

    private readonly vungMienService: VungMienService,

    private readonly gioiHanVungMienService: GioiHanVungMienService,

    private readonly phanHoiService: PhanHoiService,

    private readonly nguoiDungService: NguoiDungService,
  ) {}

  async thongKeSoPhanHoiTheoDonVi(
    maKhaoSat: string,
  ): Promise<ThongKeDonViDTO[]> {
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

    const donViMap = new Map<string, ThongKeDonViDTO>();
    for (const dv of donVis) {
      donViMap.set(dv._id.toString(), {
        _id: dv._id.toString(),
        ten_don_vi: dv.ten_don_vi,
        so_phan_hoi: mapPhanHoi.get(dv._id.toString()) || 0, // nếu không có thì gán 0
        ma_don_vi_cha: dv.ma_don_vi_cha ? dv.ma_don_vi_cha.toString() : null,
        cac_don_vi_con: [],
      });
    }

    const roots: ThongKeDonViDTO[] = [];
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
  ): Promise<ThongKeVungMienDTO[]> {
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

    const vungMienMap = new Map<string, ThongKeVungMienDTO>();
    for (const vm of vungMiens) {
      vungMienMap.set(vm._id.toString(), {
        _id: vm._id.toString(),
        ten_vung_mien: vm.ten_vung_mien,
        so_phan_hoi: mapPhanHoi.get(vm._id.toString()) || 0, // nếu không có thì gán 0
        ma_vung_mien_cha: vm.ma_vung_mien_cha
          ? vm.ma_vung_mien_cha.toString()
          : null,
        cac_vung_mien_con: [],
      });
    }

    const roots: ThongKeVungMienDTO[] = [];
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
  ): Promise<ThongKeGioiTinhDTO> {
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

    const result: ThongKeGioiTinhDTO = {
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
}
