import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly nguoiDungService: NguoiDungService,
    private readonly jwtService: JwtService,
  ) {}

  async validateNguoiDung(
    ten_dang_nhap: string,
    mat_khau: string,
  ): Promise<any> {
    const user =
      await this.nguoiDungService.getNguoiDungByTenDangNhap(ten_dang_nhap);
    if (user && (await bcrypt.compare(mat_khau, user.mat_khau))) {
      return {
        nguoi_dung: user,
        _id: user._id,
        ten_nguoi_dung: user.ten_nguoi_dung,
      };
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = {
      sub: user._id,
      ten_nguoi_dung: user.ten_nguoi_dung,
    };
    return {
      nguoi_dung: user.nguoi_dung,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async checkCanResponse(
    maNguoiDung: string,
    maKhaoSat: string,
  ): Promise<boolean> {
    const checkVungMienDonVi =
      await this.nguoiDungService.checkVungMienAndDonVi(maKhaoSat, maNguoiDung);

    const checkGioiHan = await this.nguoiDungService.checkGioiHanPhanHoi(
      maKhaoSat,
      maNguoiDung,
    );

    if (checkVungMienDonVi && checkGioiHan) return true;
    else return false;
  }
}
