import { KhaoSat } from '../schema/khao-sat.schema';
import { PhanKhaoSatDTO } from '../../phan-khao-sat/dto/phan-khao-sat.dto';

export class KhaoSatDTO extends KhaoSat {
  cac_phan_khao_sat: PhanKhaoSatDTO[];
}
