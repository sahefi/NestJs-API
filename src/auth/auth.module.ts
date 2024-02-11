import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/role/entities/role.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    TypeOrmModule.forFeature([
      RoleEntity,
      UserEntity
    ]),
    JwtModule.register({
      global: true,
      secret: 'secret-key',
      signOptions: { expiresIn: '30d' },
    }),
  ]
})
export class AuthModule {}
