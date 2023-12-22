import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from 'src/staff/entities/staff.entity';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { ConfigService } from '@nestjs/config';
import { GetRoleDto } from './dto/get-role.dto';

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
    data:query
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

findOne(id: number) {
  return `This action returns a #${id} role`;
}

update(id: number, updateRoleDto: UpdateRoleDto) {
  return `This action updates a #${id} role`;
}

remove(id: number) {
  return `This action removes a #${id} role`;
}
}
