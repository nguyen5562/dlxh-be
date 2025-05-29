import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class RemoveQuyenFromVaiTroDto {
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  quyen_ids: string[];
}
