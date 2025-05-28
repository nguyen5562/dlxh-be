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
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async getAllPermissions() {
    return await this.permissionService.findAllPermissions();
  }

  @Get(':id')
  async getPermissionById(@Param('id') id: string) {
    return await this.permissionService.findPermissionById(id);
  }

  @Post()
  async createPermission(
    @Body(ValidationPipe) createPermissionDto: CreatePermissionDto,
  ) {
    return await this.permissionService.createPermission(createPermissionDto);
  }

  @Put(':id')
  async updatePermission(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionService.updatePermission(
      id,
      updatePermissionDto,
    );
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: string) {
    return await this.permissionService.deletePermission(id);
  }
}
