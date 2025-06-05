import { Test, TestingModule } from '@nestjs/testing';
import { CotacoesItensRespostasService } from './cotacoes_itens_respostas.service';

describe('CotacoesItensRespostasService', () => {
  let service: CotacoesItensRespostasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CotacoesItensRespostasService],
    }).compile();

    service = module.get<CotacoesItensRespostasService>(CotacoesItensRespostasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
