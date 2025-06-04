import { PhanKhaoSat } from '../schema/phan-khao-sat.schema';
import { CauHoiDTO } from '../../cau-hoi/dto/cau-hoi.dto';

export class PhanKhaoSatDTO extends PhanKhaoSat {
  cac_cau_hoi: CauHoiDTO[];
}
