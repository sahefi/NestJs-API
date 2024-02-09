
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty({message:'ID Cannot Be Empty'})
    @IsUUID('4',{message:'ID User Must Be Valid UUID'})
    id:string

    @IsNotEmpty({message:'Username Cannot Be Empty'})
    @IsString({message:'Username Must Be String'})
    username:string

    @IsNotEmpty({ message: 'New Password Cannot Be Empty' })
    @IsString({ message: 'New Password Must Be String' })
    old_password: string;

    @IsNotEmpty({ message: 'New Password Cannot Be Empty' })
    @IsString({ message: 'New Password Must Be String' })
    new_password: string;

    @IsNotEmpty({message:'ID Cannot Be Empty'})
    @IsUUID('4',{message:'ID Role Must Be Valid UUID'})
    id_role:string
}
