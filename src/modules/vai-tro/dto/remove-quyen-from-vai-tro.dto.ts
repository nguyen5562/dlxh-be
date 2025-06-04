import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class RemoveQuyenFromVaiTroDTO {
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  quyen_ids: string[];
}
