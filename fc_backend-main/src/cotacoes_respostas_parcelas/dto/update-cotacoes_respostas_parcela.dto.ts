import { PartialType } from '@nestjs/mapped-types';
import { CreateCotacoesRespostasParcelaDto } from './create-cotacoes_respostas_parcela.dto';

export class UpdateCotacoesRespostasParcelaDto extends PartialType(CreateCotacoesRespostasParcelaDto) {}
