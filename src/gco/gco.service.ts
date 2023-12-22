import { Injectable } from '@nestjs/common';
import { CreateGcoDto } from './dto/create-gco.dto';
import { UpdateGcoDto } from './dto/update-gco.dto';

@Injectable()
export class GcoService {
  create(createGcoDto: CreateGcoDto) {
    return 'This action adds a new gco';
  }

  findAll() {
    return `This action returns all gco`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gco`;
  }

  update(id: number, updateGcoDto: UpdateGcoDto) {
    return `This action updates a #${id} gco`;
  }

  remove(id: number) {
    return `This action removes a #${id} gco`;
  }
}
