import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificacoesUsuarioDto } from './create-notificacoes_usuario.dto';

export class UpdateNotificacoesUsuarioDto extends PartialType(CreateNotificacoesUsuarioDto) {}
