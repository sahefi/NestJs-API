import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repoUser: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly repoRole : Repository<RoleEntity>
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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
