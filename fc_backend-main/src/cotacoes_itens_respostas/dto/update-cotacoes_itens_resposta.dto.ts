import { PartialType } from '@nestjs/mapped-types';
import { CreateCotacoesItensRespostaDto } from './create-cotacoes_itens_resposta.dto';

export class UpdateCotacoesItensRespostaDto extends PartialType(CreateCotacoesItensRespostaDto) {}
