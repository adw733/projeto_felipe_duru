import { Module } from '@nestjs/common';
import { NotificacoesUsuariosService } from './notificacoes_usuarios.service';
import { NotificacoesUsuariosController } from './notificacoes_usuarios.controller';

@Module({
  controllers: [NotificacoesUsuariosController],
  providers: [NotificacoesUsuariosService]
})
export class NotificacoesUsuariosModule {}
