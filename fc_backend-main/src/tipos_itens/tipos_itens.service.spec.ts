import { Test, TestingModule } from '@nestjs/testing';
import { TiposItensService } from './tipos_itens.service';

describe('TiposItensService', () => {
  let service: TiposItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposItensService],
    }).compile();

    service = module.get<TiposItensService>(TiposItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
