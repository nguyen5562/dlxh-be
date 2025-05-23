import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../enums/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // ✅ Cần JWT guard trước
  @Roles(Role.ADMIN) // 👈 Chỉ ADMIN mới truy cập được
  @Get('admin-dashboard')
  getDashboard() {
    return { message: 'Welcome admin!' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // ✅ Cần JWT guard trước
  @Roles(Role.USER) // 👈 Chỉ USER mới truy cập đượ
  @Get('user-dashboard')
  getUserDashboard() {
    return { message: 'Welcome user!' };
  }

  @Get('crash')
  crash() {
    throw new Error('Lỗi thử nghiệm');
  }
}
