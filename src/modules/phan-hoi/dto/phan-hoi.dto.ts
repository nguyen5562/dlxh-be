import { ChiTietPhanHoi } from '../../chi-tiet-phan-hoi/schema/chi-tiet-phan-hoi.schema';
import { PhanHoi } from '../schema/phan-hoi.schema';

export class PhanHoiDTO extends PhanHoi {
  chi_tiet_phan_hoi: ChiTietPhanHoi[];
}
