import { Test, TestingModule } from '@nestjs/testing';
import { CotacoesItensController } from './cotacoes_itens.controller';
import { CotacoesItensService } from './cotacoes_itens.service';

describe('CotacoesItensController', () => {
  let controller: CotacoesItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CotacoesItensController],
      providers: [CotacoesItensService],
    }).compile();

    controller = module.get<CotacoesItensController>(CotacoesItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
