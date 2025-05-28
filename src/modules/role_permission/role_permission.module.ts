import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermissionSchema } from './schema/role_permission.schema';
import { RolePermissionService } from './role_permission.service';
import { RolePermissionController } from './role_permission.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RolePermission', schema: RolePermissionSchema },
    ]),
  ],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
