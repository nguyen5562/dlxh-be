import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schema/permission.schema';
import { Model } from 'mongoose';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const newPermission =
      await this.permissionModel.create(createPermissionDto);
    return newPermission;
  }

  async updatePermission(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const updated = await this.permissionModel.findByIdAndUpdate(
      id,
      updatePermissionDto,
      {
        new: true,
      },
    );
    if (!updated) throw new NotFoundException(`Permission not found`);
    return updated;
  }

  async deletePermission(id: string): Promise<any> {
    const result = await this.permissionModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Permission not found`);
    return {
      message: 'Permission deleted successfully',
      statusCode: 200,
    };
  }

  async findAllPermissions(): Promise<Permission[]> {
    return await this.permissionModel.find();
  }

  async findPermissionById(id: string): Promise<Permission> {
    const permission = await this.permissionModel.findById(id);
    if (!permission) throw new NotFoundException(`Permission not found`);
    return permission;
  }
}
