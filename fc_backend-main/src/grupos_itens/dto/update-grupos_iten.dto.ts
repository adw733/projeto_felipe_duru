import { PartialType } from '@nestjs/mapped-types';
import { CreateGruposItenDto } from './create-grupos_iten.dto';

export class UpdateGruposItenDto extends PartialType(CreateGruposItenDto) {}
