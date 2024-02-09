import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { DeleteUserDto } from './dto/soft-delet-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() getUserDto:GetUserDto) {
   try {
    return await this.userService.findAll(getUserDto)
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

  @Get('/detail')
  async findOne(@Query('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      if(status === error.status){
        return {
          status: false,
          message: error.message,
          data: null,
        }
      }
    }
    
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(updateUserDto);
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      if(status === error.status){
        return {
          status: false,
          message: error.message,
          data: null,
        }
      }
    }
  }

  @Delete('')
  async remove(@Query() deleteUserDto : DeleteUserDto) {
    try {
      return await this.userService.remove(deleteUserDto);
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      if(status === error.status){
        return {
          status: false,
          message: error.message,
          data: null,
        }
      }
    }
  }
}
