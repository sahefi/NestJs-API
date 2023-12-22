import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GcoService } from './gco.service';
import { CreateGcoDto } from './dto/create-gco.dto';
import { UpdateGcoDto } from './dto/update-gco.dto';

@Controller('gco')
export class GcoController {
  constructor(private readonly gcoService: GcoService) {}

  @Post()
  create(@Body() createGcoDto: CreateGcoDto) {
    return this.gcoService.create(createGcoDto);
  }

  @Get()
  findAll() {
    return this.gcoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gcoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGcoDto: UpdateGcoDto) {
    return this.gcoService.update(+id, updateGcoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gcoService.remove(+id);
  }
}
