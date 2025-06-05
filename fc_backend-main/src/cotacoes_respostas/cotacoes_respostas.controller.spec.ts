import { Test, TestingModule } from '@nestjs/testing';
import { CotacoesRespostasController } from './cotacoes_respostas.controller';
import { CotacoesRespostasService } from './cotacoes_respostas.service';

describe('CotacoesRespostasController', () => {
  let controller: CotacoesRespostasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CotacoesRespostasController],
      providers: [CotacoesRespostasService],
    }).compile();

    controller = module.get<CotacoesRespostasController>(CotacoesRespostasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
