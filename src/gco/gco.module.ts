import { Module } from '@nestjs/common';
import { GcoService } from './gco.service';
import { GcoController } from './gco.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GcoEntity } from './entities/gco.entity';

@Module({
  controllers: [GcoController],
  providers: [GcoService],
  imports:[
    TypeOrmModule.forFeature([
      GcoEntity
    ])
  ]
})
export class GcoModule {}
