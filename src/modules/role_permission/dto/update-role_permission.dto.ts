import { IsOptional, IsMongoId } from 'class-validator';

export class UpdateRolePermissionDto {
  @IsMongoId()
  @IsOptional()
  ma_nhom?: string;

  @IsMongoId()
  @IsOptional()
  ma_quyen?: string;
}
