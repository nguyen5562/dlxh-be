import { DapAn } from '../../dap-an/schema/dap-an.schema';
import { CauHoi } from '../schema/cau-hoi.schema';

export class CauHoiDTO extends CauHoi {
  dap_ans: DapAn[];
}
