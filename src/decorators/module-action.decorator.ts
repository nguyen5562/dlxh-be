import { SetMetadata } from '@nestjs/common';
import { ChucNangHeThong } from '../enums/chuc-nang-he-thong.enum';
import { QuyenHeThong } from '../enums/quyen-he-thong.enum';

export const ModulePermission = (module: ChucNangHeThong) =>
  SetMetadata('module', module);

export const ActionsPermission = (actions: Array<QuyenHeThong>) =>
  SetMetadata('actions', actions);
