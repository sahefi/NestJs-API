import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from 'typeorm';
import { RoleEntity } from './entities/role.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports:[
    TypeOrmModule.forFeature([
      RoleEntity
    ])
  ]
})

export class RoleModule {}
