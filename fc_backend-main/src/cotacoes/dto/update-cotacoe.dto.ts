import { PartialType } from '@nestjs/mapped-types';
import { CreateCotacoeDto } from './create-cotacoe.dto';

export class UpdateCotacoeDto extends PartialType(CreateCotacoeDto) {}
