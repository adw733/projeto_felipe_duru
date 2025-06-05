import { Test, TestingModule } from '@nestjs/testing';
import { NotificacoesUsuariosController } from './notificacoes_usuarios.controller';
import { NotificacoesUsuariosService } from './notificacoes_usuarios.service';

describe('NotificacoesUsuariosController', () => {
  let controller: NotificacoesUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificacoesUsuariosController],
      providers: [NotificacoesUsuariosService],
    }).compile();

    controller = module.get<NotificacoesUsuariosController>(NotificacoesUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
