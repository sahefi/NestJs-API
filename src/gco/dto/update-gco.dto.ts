import { PartialType } from '@nestjs/mapped-types';
import { CreateGcoDto } from './create-gco.dto';

export class UpdateGcoDto extends PartialType(CreateGcoDto) {}
