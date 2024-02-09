import { IsOptional } from "class-validator";

export class GetUserDto{
    @IsOptional()
    page?:Number

    @IsOptional()
    per_page?:Number
}