import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateAuthDto {
    @IsNotEmpty({message:'Username Cannot Be Empty'})
    @IsString({message:'Username Must Be String'})
    username:string

    @IsNotEmpty({message:'Password Cannot Be Empty'})
    @IsString({message:'Password Must Be String'})
    password:string

    @IsNotEmpty({message:'Username Cannot Be Empty'})
    @IsUUID('4',{message:'Role Must Be Valid UUID'})
    id_role:string
}
