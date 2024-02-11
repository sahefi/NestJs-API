import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { TokenMiddleware } from 'src/token/token.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity
    ])
  ]
})
export class UserModule {
  configure(user: MiddlewareConsumer) {
    user
      .apply(TokenMiddleware)
      .forRoutes(UserController);
  }
}

