import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ChucNangHeThong } from '../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../enums/quyen-he-thong.enum';
import { NguoiDungService } from '../modules/nguoi-dung/nguoi-dung.service';

@Injectable()
export class PermissionsGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly nguoiDungService: NguoiDungService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const passportActive = await super.canActivate(context);

    if (!passportActive) {
      throw new UnauthorizedException();
    }

    const module: ChucNangHeThong = this.reflector.get<ChucNangHeThong>(
      'module',
      context.getHandler(),
    );
    const actions: Array<QuyenHeThong> = this.reflector.get<
      Array<QuyenHeThong>
    >('actions', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const nguoiDung = await this.nguoiDungService.getNguoiDungById(user.userId);
    if (!nguoiDung) return false;
    // request.nguoiDungId = nguoiDung._id;
    // request.nguoiDung = nguoiDung;

    if (!module || !actions) return true;

    const result = await this.nguoiDungService.checkQuyen(
      nguoiDung._id.toString(),
      module,
      actions,
    );

    return result;
  }
}
