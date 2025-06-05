import { PartialType } from '@nestjs/mapped-types';
import { CreateMenusPerfiDto } from './create-menus_perfi.dto';

export class UpdateMenusPerfiDto extends PartialType(CreateMenusPerfiDto) {}
