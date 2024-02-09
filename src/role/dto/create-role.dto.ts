import {  IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({message:'Name Cannot Be Empty'})
    @IsString({message:'Name Must Be String'})
    name:string
}
