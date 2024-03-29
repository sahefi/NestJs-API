import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty({message:'Username Cannot Be Empty'})
    @IsString({message:'Username Must Be String'})
    username:string

    @IsNotEmpty({message:'Password Cannot Be Empty'})
    @IsString({message:'Password Must Be String'})
    password:string

    @IsNotEmpty({message:'Username Cannot Be Empty'})
    @IsUUID('all',{message:'Role Must Be Valid UUID'})
    id_role:string

}
