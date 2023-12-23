import { PartialType } from "@nestjs/mapped-types";
import { DetailRoleDto } from "./detail-role.dto";

export class DeleteRoleDto extends PartialType(DetailRoleDto){}