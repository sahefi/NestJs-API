import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repoUser: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly repoRole : Repository<RoleEntity>,

    private jwtService: JwtService
  ){}

  async create(createAuthDto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(createAuthDto.password,10)
    const findRole = await this.repoRole.find({
      where:{
        id:createAuthDto.id_role
      }
    })
    if(!findRole){
      throw new NotFoundException ('ID Role Not Found')
    }

    const role = findRole[0]

    const uniqueUsername = await this.repoUser.find({
      where:{
        username:createAuthDto.username
      }
    })

    if(uniqueUsername.length > 0 ){
      throw new BadRequestException ('Username Already Exist')
    }

    const query = await this.repoUser.create({
      username:createAuthDto.username,
      password:hashedPassword,
      id_role:createAuthDto.id_role
    })
    await this.repoUser.save(query)

    return{
      status:true,
      message:'Success',
      data:{
        id:query.id,
        username:query.username,
        role:{
          name:role.name
        }
      }
    }
  }

  async login(loginAuthDto:LoginAuthDto) {
    const user = await this.repoUser.findOne({
      where:{
        username:loginAuthDto.username
      }
    })

    if(!user){
      throw new NotFoundException('Invalid Credential')
    }

    const passwordMatch = await bcrypt.compare(loginAuthDto.password,user.password)
    if(!passwordMatch){
      throw new BadRequestException('Invalid Credential')
    }

    const payload = {id:user.id}
    const token = await this.jwtService.signAsync(payload)
    

    return{
      status:true,
      message:'Success',
      data:{
        token:token
      }
    }

  }

}
