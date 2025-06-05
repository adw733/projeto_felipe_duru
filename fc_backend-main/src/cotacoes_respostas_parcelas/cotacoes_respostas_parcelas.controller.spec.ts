import { Test, TestingModule } from '@nestjs/testing';
import { CotacoesRespostasParcelasController } from './cotacoes_respostas_parcelas.controller';
import { CotacoesRespostasParcelasService } from './cotacoes_respostas_parcelas.service';

describe('CotacoesRespostasParcelasController', () => {
  let controller: CotacoesRespostasParcelasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CotacoesRespostasParcelasController],
      providers: [CotacoesRespostasParcelasService],
    }).compile();

    controller = module.get<CotacoesRespostasParcelasController>(CotacoesRespostasParcelasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
