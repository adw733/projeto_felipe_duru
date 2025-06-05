import { Test, TestingModule } from '@nestjs/testing';
import { PessoasPerfisService } from './pessoas_perfis.service';

describe('PessoasPerfisService', () => {
  let service: PessoasPerfisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasPerfisService],
    }).compile();

    service = module.get<PessoasPerfisService>(PessoasPerfisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
