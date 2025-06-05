import { Test, TestingModule } from '@nestjs/testing';
import { CotacoesRespostasParcelasService } from './cotacoes_respostas_parcelas.service';

describe('CotacoesRespostasParcelasService', () => {
  let service: CotacoesRespostasParcelasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CotacoesRespostasParcelasService],
    }).compile();

    service = module.get<CotacoesRespostasParcelasService>(CotacoesRespostasParcelasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
