import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { DetailRoleDto } from './dto/detail-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll(@Query() getRoleDto: GetRoleDto) {
    return await this.roleService.findAll(getRoleDto);
  }

  @Get('/id')
  findOne(@Query() detailRoledto: DetailRoleDto) {
    return this.roleService.findOne(detailRoledto);
  }

  @Patch()
  update(@Body() updateRoleDto: UpdateRoleDto) {
    try {
      return this.roleService.update(updateRoleDto);
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      if(status === error.status){
        return {
          status: false,
          message: error.message,
          data: null,
        };
      }
    }
  }

  @Delete()
  remove(@Query() deleteRoleDto : DeleteRoleDto) {
    console.log(Param);
    
      return this.roleService.remove(deleteRoleDto);

  }
}
