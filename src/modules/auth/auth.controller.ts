import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly nguoiDungService: NguoiDungService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const ans = await this.authService.login(req.user);
    return ApiResponse(res, ResponseCode.SUCCESS, 'Đăng nhập thành công', ans);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req, @Response() res) {
    const userId = req.user.userId;
    const vaitro = await this.nguoiDungService.getVaiTroByNguoiDungId(userId);
    const quyens = await this.nguoiDungService.getQuyensByNguoiDungId(userId);
    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy quyền của người dùng hiện tại thành công',
      {
        role: vaitro,
        permissions: quyens,
      },
    );
  }
}
