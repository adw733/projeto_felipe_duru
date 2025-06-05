import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposItenDto } from './create-tipos_iten.dto';

export class UpdateTiposItenDto extends PartialType(CreateTiposItenDto) {}
