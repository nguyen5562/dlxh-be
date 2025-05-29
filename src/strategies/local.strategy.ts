import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'ten_dang_nhap',
      passwordField: 'mat_khau',
    });
  }

  async validate(ten_dang_nhap: string, mat_khau: string): Promise<any> {
    const user = await this.authService.validateNguoiDung(
      ten_dang_nhap,
      mat_khau,
    );
    if (!user) {
      throw new UnauthorizedException('Sai tên đăng nhập hoặc mật khẩu');
    }
    return user;
  }
}
