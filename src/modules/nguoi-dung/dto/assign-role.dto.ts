import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AssignRoleDto {
  @IsMongoId()
  @IsNotEmpty()
  ma_vai_tro: string;
}
