import { Module, NotFoundException } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './staff/staff.module';
import { RoleModule } from './role/role.module';
import { GcoModule } from './gco/gco.module';
import { CommentModule } from './comment/comment.module';
import { ProductModule } from './product/product.module';
import { CompanyModule } from './company/company.module';
import { FinanceModule } from './finance/finance.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configservice: ConfigService)=>({
        type:"postgres",
        host:configservice.get('DB_HOST'),
        port:configservice.get('DB_PORT'),
        username:configservice.get('DB_USERNAME'),
        password:configservice.get('DB_PASSWORD'),
        database:configservice.get('DB_NAME'),
        autoLoadEntities:true,
        synchronize:configservice.get('DB_SYNCHRONIZE') === '1' ? true:false,
        logging:true
      }),
      inject:[ConfigService],
    }),
    
    StaffModule, RoleModule, GcoModule, CommentModule, ProductModule, CompanyModule, FinanceModule, TransactionModule, UserModule, CustomerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,{provide:APP_FILTER,useClass:NotFoundException}]
})
export class AppModule {}
