import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { TokenMiddleware } from 'src/token/token.middleware';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports:[
    TypeOrmModule.forFeature([
      RoleEntity,
      UserEntity
    ])
  ]
})

export class RoleModule {
  configure(role: MiddlewareConsumer) {
    role
      .apply(TokenMiddleware)
      .forRoutes(RoleController);
  }
}
