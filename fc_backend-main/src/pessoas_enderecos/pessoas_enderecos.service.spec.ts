import { Test, TestingModule } from '@nestjs/testing';
import { PessoasEnderecosService } from './pessoas_enderecos.service';

describe('PessoasEnderecosService', () => {
  let service: PessoasEnderecosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasEnderecosService],
    }).compile();

    service = module.get<PessoasEnderecosService>(PessoasEnderecosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
