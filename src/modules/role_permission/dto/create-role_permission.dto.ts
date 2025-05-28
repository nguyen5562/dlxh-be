import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateRolePermissionDto {
  @IsMongoId()
  @IsNotEmpty()
  ma_nhom: string;

  @IsMongoId()
  @IsNotEmpty()
  ma_quyen: string;
}
