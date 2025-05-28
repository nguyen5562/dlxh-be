import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = await this.roleModel.create(createRoleDto);
    return newRole;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const updated = await this.roleModel.findByIdAndUpdate(id, updateRoleDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException(`Role not found`);
    return updated;
  }

  async deleteRole(id: string): Promise<any> {
    const result = await this.roleModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Role not found`);
    return {
      message: 'Role deleted successfully',
      statusCode: 200,
    };
  }

  async findAllRoles(): Promise<Role[]> {
    return await this.roleModel.find();
  }

  async findRoleById(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id);
    if (!role) throw new NotFoundException(`Role not found`);
    return role;
  }
}
