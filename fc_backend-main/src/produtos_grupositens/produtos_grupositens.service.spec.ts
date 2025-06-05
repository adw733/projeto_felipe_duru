import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosGrupositensService } from './produtos_grupositens.service';

describe('ProdutosGrupositensService', () => {
  let service: ProdutosGrupositensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutosGrupositensService],
    }).compile();

    service = module.get<ProdutosGrupositensService>(ProdutosGrupositensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
