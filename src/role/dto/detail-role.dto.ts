import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DetailRoleDto{
    @IsNotEmpty({message:'ID Cannot Be Empty'})
    @IsString({message:'Id Must Be String'})
    id:string
}