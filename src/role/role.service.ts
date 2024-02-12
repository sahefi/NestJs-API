import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { ConfigService } from '@nestjs/config';
import { GetRoleDto } from './dto/get-role.dto';
import { DetailRoleDto } from './dto/detail-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';

@Injectable()
export class RoleService {
constructor(
  @InjectRepository(RoleEntity)
  private readonly repoRole: Repository<RoleEntity>,

){} 

async create(createRoleDto: CreateRoleDto) {
  const query = await this.repoRole.create({
    name:createRoleDto.name,
  })
  await query.save()
  return{
    status:true,
    message:'Succes',
    data:{
      id:query.id,
      name:query.name
    }
  }
  
}

async findAll(getRoleDto: GetRoleDto) {
  try {
    const page = +getRoleDto.page || 1;
    const take = +getRoleDto.per_page || 10;
    const skip = (page - 1) * 10;
    const nextPage = page + 1;
    const prevPage = page - 1;

    const [data,total] = await this.repoRole.findAndCount({
      where: { 
        name: getRoleDto.name,
      },
      skip:skip,
      take:take
    });

    const response = data.map((item)=>{
      return{
        id:item.id,
        name:item.name
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
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      status: false,
      message: 'Error occurred while fetching data',
      error: error.message
    };
  }
  
}

async findOne(detailRoleDto : DetailRoleDto) {
  const query = await this.repoRole.findOne({
    where:{
      id:detailRoleDto.id
    }
  })
  
  if(!query){
    throw new NotFoundException(`ID ${detailRoleDto.id} Not Found `)
  }
  return{
    status:true,
    message:"Success",
    data:{
      id:query.id,
      name:query.name
    }
  }
}

async update(updateRoleDto: UpdateRoleDto) {
  
  const find = await this.repoRole.findOne({
    where:{
      id:updateRoleDto.id
    }
  })
  if(!find){
    throw new NotFoundException(`ID ${updateRoleDto.id} Not Found`)
  }
  

  await this.repoRole.update(
    {id:updateRoleDto.id},
    {name:updateRoleDto.name}
    )
    
    const result = await this.repoRole.findOne({
    where:{
      id:updateRoleDto.id
    }
  })


  
  // await result.save

  const res = {
    id:result.id,
    name:result.name
  }

  return{
    status:true,
    message:'Success',
    data:res
  }
}

async remove(deleterRoleDto : DeleteRoleDto) {
  const query = await this.repoRole.delete({id:deleterRoleDto.id})
  if(query.affected < 1){
    throw new NotFoundException(`ID ${deleterRoleDto.id} Not Found`)
  }

  
  return{
    status:true,
    message:'Success',
    data:null
  }
}
}
