import { Test, TestingModule } from '@nestjs/testing';
import { CotacoesItensRespostasController } from './cotacoes_itens_respostas.controller';
import { CotacoesItensRespostasService } from './cotacoes_itens_respostas.service';

describe('CotacoesItensRespostasController', () => {
  let controller: CotacoesItensRespostasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CotacoesItensRespostasController],
      providers: [CotacoesItensRespostasService],
    }).compile();

    controller = module.get<CotacoesItensRespostasController>(CotacoesItensRespostasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
