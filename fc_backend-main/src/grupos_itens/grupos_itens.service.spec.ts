import { Test, TestingModule } from '@nestjs/testing';
import { GruposItensService } from './grupos_itens.service';

describe('GruposItensService', () => {
  let service: GruposItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GruposItensService],
    }).compile();

    service = module.get<GruposItensService>(GruposItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
