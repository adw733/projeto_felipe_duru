import { Injectable } from '@nestjs/common';
import { CreateNotificacoesUsuarioDto } from './dto/create-notificacoes_usuario.dto';
import { UpdateNotificacoesUsuarioDto } from './dto/update-notificacoes_usuario.dto';

@Injectable()
export class NotificacoesUsuariosService {
  create(createNotificacoesUsuarioDto: CreateNotificacoesUsuarioDto) {
    return 'This action adds a new notificacoesUsuario';
  }

  findAll() {
    return `This action returns all notificacoesUsuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacoesUsuario`;
  }

  update(id: number, updateNotificacoesUsuarioDto: UpdateNotificacoesUsuarioDto) {
    return `This action updates a #${id} notificacoesUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacoesUsuario`;
  }
}
