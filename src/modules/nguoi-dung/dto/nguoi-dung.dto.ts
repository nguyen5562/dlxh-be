import { VaiTro } from '../../vai-tro/schema/vai-tro.schema';
import { NguoiDung } from '../schema/nguoi-dung.schema';
import { Quyen } from '../../quyen/schema/quyen.schema';

export class NguoiDungDTO extends NguoiDung {
  role: VaiTro;
  permissions: Quyen[];
}
