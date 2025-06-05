import { Test, TestingModule } from '@nestjs/testing';
import { PessoasGruposItensService } from './pessoas_grupos-itens.service';

describe('PessoasGruposItensService', () => {
  let service: PessoasGruposItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasGruposItensService],
    }).compile();

    service = module.get<PessoasGruposItensService>(PessoasGruposItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
