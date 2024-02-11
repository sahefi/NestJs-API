import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    try {
      return await this.authService.create(createAuthDto);
    } catch (error) {
      const status = error.status|| HttpStatus.INTERNAL_SERVER_ERROR
      if(status === error.status){
        return{
          status: false,
          message: error.message,
          data: null,
        }
      }
    }
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    try {
        return await this.authService.login(loginAuthDto)
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR
      if(status === error.status){
        return{
          status:false,
          message:error.message,
          data:null
        }
      }
      
    }
  }
}
