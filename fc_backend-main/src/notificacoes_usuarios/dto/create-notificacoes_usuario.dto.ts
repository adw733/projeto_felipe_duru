import { UUID } from 'crypto';
import { Notificacoe } from '../../notificacoes/entities/notificacoe.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

export class CreateNotificacoesUsuarioDto {
  id?: number;
  uuid?: UUID;
  notificacao?: Notificacoe;
  notificacaoId?: number;
  pessoa?: Pessoa;
  pessoaId: number;
  lida: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
