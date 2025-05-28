import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto';
import { RolePermissionService } from './role_permission.service';
import { CreateRolePermissionDto } from './dto/create-role_permission.dto';

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Get()
  async getAllRolePermissions() {
    return await this.rolePermissionService.findAllRolePermissions();
  }

  @Get(':id')
  async getRolePermissionById(@Param('id') id: string) {
    return await this.rolePermissionService.findRolePermissionById(id);
  }

  @Get('role/:roleId')
  async getPermissionsByRoleId(@Param('roleId') roleId: string) {
    return await this.rolePermissionService.findPermissionsByRoleId(roleId);
  }

  @Get('permission/:permissionId')
  async getRolesByPermissionId(@Param('permissionId') permissionId: string) {
    return await this.rolePermissionService.findRolesByPermissionId(
      permissionId,
    );
  }

  @Post()
  async createRolePermission(
    @Body(ValidationPipe) createRolePermissionDto: CreateRolePermissionDto,
  ) {
    return await this.rolePermissionService.createRolePermission(
      createRolePermissionDto,
    );
  }

  @Put(':id')
  async updateRolePermission(
    @Param('id') id: string,
    @Body(ValidationPipe) updateRolePermissionDto: UpdateRolePermissionDto,
  ) {
    return await this.rolePermissionService.updateRolePermission(
      id,
      updateRolePermissionDto,
    );
  }

  @Delete(':id')
  async deleteRolePermission(@Param('id') id: string) {
    return await this.rolePermissionService.deleteRolePermission(id);
  }
}
