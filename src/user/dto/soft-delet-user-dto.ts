import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteUserDto{
    @IsNotEmpty({message:'ID Cannot Be Empty'})
    @IsUUID('4',{message:'ID User Must Be Valid UUID'})
    id:string
}