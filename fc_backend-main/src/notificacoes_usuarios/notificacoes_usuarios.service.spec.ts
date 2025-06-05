import { Test, TestingModule } from '@nestjs/testing';
import { NotificacoesUsuariosService } from './notificacoes_usuarios.service';

describe('NotificacoesUsuariosService', () => {
  let service: NotificacoesUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificacoesUsuariosService],
    }).compile();

    service = module.get<NotificacoesUsuariosService>(NotificacoesUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
