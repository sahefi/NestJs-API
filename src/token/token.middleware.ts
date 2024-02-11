import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService:JwtService
  ){}
  use(req: Request, res: Response, next: NextFunction) {
        
    const {authorization} = req.headers

    if(authorization){
      try {
        const decoded = this.jwtService.verify(authorization)
        req['user'] = decoded
        next();
      } catch (error) {
        throw new UnauthorizedException('Invalid or Expired Token')
      }
    }else{
      throw new UnauthorizedException('Unathorized')
    }
  }
}
