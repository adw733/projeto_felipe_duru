import { PartialType } from '@nestjs/mapped-types';
import { CreateCotacoesRespostaDto } from './create-cotacoes_resposta.dto';

export class UpdateCotacoesRespostaDto extends PartialType(CreateCotacoesRespostaDto) {}
