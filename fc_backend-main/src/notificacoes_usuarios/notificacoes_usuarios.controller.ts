import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificacoesUsuariosService } from './notificacoes_usuarios.service';
import { CreateNotificacoesUsuarioDto } from './dto/create-notificacoes_usuario.dto';
import { UpdateNotificacoesUsuarioDto } from './dto/update-notificacoes_usuario.dto';

@Controller('notificacoes-usuarios')
export class NotificacoesUsuariosController {
  constructor(private readonly notificacoesUsuariosService: NotificacoesUsuariosService) {}

  @Post()
  create(@Body() createNotificacoesUsuarioDto: CreateNotificacoesUsuarioDto) {
    return this.notificacoesUsuariosService.create(createNotificacoesUsuarioDto);
  }

  @Get()
  findAll() {
    return this.notificacoesUsuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacoesUsuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificacoesUsuarioDto: UpdateNotificacoesUsuarioDto) {
    return this.notificacoesUsuariosService.update(+id, updateNotificacoesUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacoesUsuariosService.remove(+id);
  }
}
