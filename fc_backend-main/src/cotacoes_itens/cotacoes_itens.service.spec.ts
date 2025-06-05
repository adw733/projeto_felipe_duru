import { Test, TestingModule } from '@nestjs/testing';
import { CotacoesItensService } from './cotacoes_itens.service';

describe('CotacoesItensService', () => {
  let service: CotacoesItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CotacoesItensService],
    }).compile();

    service = module.get<CotacoesItensService>(CotacoesItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
