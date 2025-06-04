import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class AddQuyenToVaiTroDTO {
  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  quyen_ids: string[];
}
