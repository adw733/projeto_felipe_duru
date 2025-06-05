import { PartialType } from '@nestjs/mapped-types';
import { CreateAnexoDto } from './create-anexo.dto';
import { UUID } from 'crypto';

export class UpdateAnexoDto extends PartialType(CreateAnexoDto) {
    id: number;
    uuid: UUID;
}
