import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsNotEmpty({message:'ID Cannot Be Empty'})
    @IsUUID()
    @IsString({message:'ID Must Be String'})
    id:string
}
