import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { PermissionsGuard } from '../../guards/permissions.guard';
import {
  ModulePermission,
  ActionsPermission,
} from '../../decorators/module-action.decorator';
import { ChucNangHeThong } from '../../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../../enums/quyen-he-thong.enum';
import { ApiResponse } from '../../helper/response.helper';
import { ResponseCode, ResponseMessage } from '../../const/response.const';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const ans = await this.authService.login(req.user);
    return ApiResponse(
      res,
      true,
      ResponseCode.SUCCESS,
      ResponseMessage.SUCCESS,
      ans,
    );
  }

  @UseGuards(PermissionsGuard)
  @ModulePermission(ChucNangHeThong.PhanQuyen)
  @ActionsPermission([QuyenHeThong.View, QuyenHeThong.Edit])
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
