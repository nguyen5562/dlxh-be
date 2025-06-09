import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode } from '../../const/response.const';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
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
    const result =
      await this.nguoiDungService.getVaiTroAndQuyensByNguoiDungId(userId);

    return ApiResponse(
      res,
      ResponseCode.SUCCESS,
      'Lấy quyền của người dùng hiện tại thành công',
      {
        role: result.vaiTro,
        permissions: result.quyens,
      },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-id')
  getId(@Request() req, @Response() res) {
    const ans = req.user.userId;
    return ApiResponse(res, ResponseCode.SUCCESS, 'Lấy id thành công', ans);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-can-response')
  async checkCanResponse(@Request() req, @Response() res, maKhaoSat: string) {
    const userId: string = req.user.userId;
    const ans = await this.authService.checkCanResponse(userId, maKhaoSat);

    if (!ans)
      return ApiResponse(
        res,
        ResponseCode.BAD_REQUEST,
        'Bạn không được quyền phản hồi khảo sát này',
        ans,
      );
    else
      return ApiResponse(
        res,
        ResponseCode.SUCCESS,
        'Bạn được quyền phản hồi khảo sát này',
        ans,
      );
  }
}
