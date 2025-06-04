import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AssignRoleDTO {
  @IsMongoId()
  @IsNotEmpty()
  ma_vai_tro: string;
}
