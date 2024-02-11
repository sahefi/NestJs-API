import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
    @IsNotEmpty({message:'Username Cannot Be Empty'})
    @IsString({message:'Username Must Be String'})
    username:string

    @IsNotEmpty({message:'Password Cannot Be Empty'})
    @IsString({message:'Password Must Be String'})
    password:string
}
