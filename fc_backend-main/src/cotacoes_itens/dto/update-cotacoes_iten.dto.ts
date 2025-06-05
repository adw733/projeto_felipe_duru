import { PartialType } from '@nestjs/mapped-types';
import { CreateCotacoesItenDto } from './create-cotacoes_iten.dto';

export class UpdateCotacoesItenDto extends PartialType(CreateCotacoesItenDto) {}
