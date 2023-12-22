import { IsOptional } from "class-validator";

export class GetRoleDto{
    @IsOptional()
    name?:string

    @IsOptional()
    page?:Number

    @IsOptional()
    per_page?:Number
}