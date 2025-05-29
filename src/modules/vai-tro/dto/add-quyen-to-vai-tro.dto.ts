import { IsArray, IsMongoId } from 'class-validator';

export class AddQuyenToVaiTroDto {
  @IsArray()
  @IsMongoId({ each: true })
  quyen_ids: string[];
}
