import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports:[
    TypeOrmModule.forFeature([
      CustomerEntity
    ])
  ]
})
export class CustomerModule {}
