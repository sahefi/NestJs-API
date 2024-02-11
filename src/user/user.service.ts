import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/role/entities/role.entity';

import { GetUserDto } from './dto/get-user.dto';
import { DeleteUserDto } from './dto/soft-delet-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repoUser: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly repoRole : Repository<RoleEntity>
  ){}


  async findAll(getUserDto: GetUserDto) {
    try{
    const page =+getUserDto.page || 1
    const take =+getUserDto.per_page || 10
    const skip = (page-1) * 10
    const nextPage = page + 1
    const prevPage = page - 1

    const [data,total] = await this.repoUser.findAndCount({
      where:{
        deleted_at:null
      },
      order:{
        username:'ASC'
      },
      skip:skip,
      take:take,
      relations:['role']
    })

    const response = data.map((item)=>{
      return{
        id:item.id,
        username:item.username,
        role:{
          name:item.role ? item.role.name :'null'
        }
      }
    })

    return {
      status: true,
      message: 'Success',
      page: page,
      per_page: take,
      skip: skip,
      next_page: nextPage,
      prev_page: prevPage,
      total: total,
      data: response
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      status: false,
      message: 'Error occurred while fetching data',
      error: error.message
    };
  }
  }

  async findOne(id: string) {
    const query = await this.repoUser.findOne({
      where:{
        id:id
      },
      relations:['role']
    })

    if(!query){
      throw new NotFoundException ('User Not Found')
    }

    return{
      status:true,
      message:"Success",
      data:{
        id:query.id,
        username:query.username,
        role:{
          name:query.role ? query.role.name : 'null'
        }
      }
    }

  }
  
  async update(updateUserDto: UpdateUserDto) {
  try{
  //validasi id User
  const findUser = await this.repoUser.findOne({
    where:{
      id:updateUserDto.id,
      deleted_at:null
    }
  })

  if(!findUser){
    throw new NotFoundException ('User ID Not Found')
  }

  //validasi old password
  const oldPasswordMatch = await bcrypt.compare(updateUserDto.old_password,findUser.password)
  if(!oldPasswordMatch){
    throw new BadRequestException('Invalid Old Password')
  }

  //hash new password
  const newPasswordhashed = await bcrypt.hash(updateUserDto.new_password,10)

  //validasi id Role
  const findRole = await this.repoRole.findOne({
    where:{
      id:updateUserDto.id_role
    }
  })

  if(!findRole){
    throw new NotFoundException ('ID Role Not Found')
  }



  await this.repoUser.update(
    {id:findUser.id},
    {
      username:updateUserDto.username,
      password:newPasswordhashed,
      id_role:findRole.id
    },
  )
  
  const result = await this.repoUser.findOne({
    where:{
      id:findUser.id
    }
  })

  return{
    status:true,
    message:'Success',
    data:{
      id:result.id,
      username:result.username,
      role:{
        name:findRole.name ? findRole.name : 'null'
      }
    }
  }
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      status: false,
      message: 'Error occurred while fetching data',
      error: error.message
    };
  }

  }



  async remove(deleteUserDto: DeleteUserDto) {
    const findUser = await this.repoUser.findOne({
      where:{
        id:deleteUserDto.id,
        deleted_at:null
      }
    })

    if(!findUser){
      throw new NotFoundException ('User ID Not Found')
    }

    const query = await this.repoUser.update(
      {id:findUser.id},
      {deleted_at:new Date()}
    )
      
  return{
    status:true,
    message:'Success',
    data:null
  }
  }
}
