import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RolePermission,
  RolePermissionDocument,
} from './schema/role_permission.schema';
import { Model } from 'mongoose';
import { CreateRolePermissionDto } from './dto/create-role_permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectModel(RolePermission.name)
    private rolePermissionModel: Model<RolePermissionDocument>,
  ) {}

  async createRolePermission(
    createRolePermissionDto: CreateRolePermissionDto,
  ): Promise<RolePermission> {
    const newRolePermission = await this.rolePermissionModel.create(
      createRolePermissionDto,
    );
    return newRolePermission;
  }

  async updateRolePermission(
    id: string,
    updateRolePermissionDto: UpdateRolePermissionDto,
  ): Promise<RolePermission> {
    const updated = await this.rolePermissionModel.findByIdAndUpdate(
      id,
      updateRolePermissionDto,
      {
        new: true,
      },
    );
    if (!updated) throw new NotFoundException(`RolePermission not found`);
    return updated;
  }

  async deleteRolePermission(id: string): Promise<any> {
    const result = await this.rolePermissionModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`RolePermission not found`);
    return {
      message: 'RolePermission deleted successfully',
      statusCode: 200,
    };
  }

  async findAllRolePermissions(): Promise<RolePermission[]> {
    return await this.rolePermissionModel
      .find()
      .populate('ma_nhom')
      .populate('ma_quyen');
  }

  async findRolePermissionById(id: string): Promise<RolePermission> {
    const rolePermission = await this.rolePermissionModel
      .findById(id)
      .populate('ma_nhom')
      .populate('ma_quyen');
    if (!rolePermission)
      throw new NotFoundException(`RolePermission not found`);
    return rolePermission;
  }

  async findPermissionsByRoleId(roleId: string): Promise<RolePermission[]> {
    return await this.rolePermissionModel
      .find({ ma_nhom: roleId })
      .populate('ma_quyen');
  }

  async findRolesByPermissionId(
    permissionId: string,
  ): Promise<RolePermission[]> {
    return await this.rolePermissionModel
      .find({ ma_quyen: permissionId })
      .populate('ma_nhom');
  }
}
