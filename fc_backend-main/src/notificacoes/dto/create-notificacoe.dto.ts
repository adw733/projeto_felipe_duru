import { UUID } from 'crypto';
import { Status } from '../../status/entities/status.entity';
import { CreateNotificacoesUsuarioDto } from '../../notificacoes_usuarios/dto/create-notificacoes_usuario.dto';

export class CreateNotificacoeDto {
  id?: number;
  uuid?: UUID;
  status?: Status;
  statusId: number;
  titulo: string;
  mensagem: string;
  data: Date;
  link: string;
  imagem: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // relacionamentos
  notificacoesUsuarios: CreateNotificacoesUsuarioDto[];
}
