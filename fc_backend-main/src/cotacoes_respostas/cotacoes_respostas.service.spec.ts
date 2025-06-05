import { Test, TestingModule } from '@nestjs/testing';
import { CotacoesRespostasService } from './cotacoes_respostas.service';

describe('CotacoesRespostasService', () => {
  let service: CotacoesRespostasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CotacoesRespostasService],
    }).compile();

    service = module.get<CotacoesRespostasService>(CotacoesRespostasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
