import { DapAn } from '../../dap-an/schema/dap-an.schema';
import { CauHoi } from '../schema/cau-hoi.schema';

export class CauHoiDTO extends CauHoi {
  cac_dap_an: DapAn[];
}
