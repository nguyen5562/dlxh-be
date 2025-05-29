import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class AddQuyenToVaiTroDto {
  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  quyen_ids: string[];
}
