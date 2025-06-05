import { Test, TestingModule } from '@nestjs/testing';
import { PessoasSenhasService } from './pessoas_senhas.service';

describe('PessoasSenhasService', () => {
  let service: PessoasSenhasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasSenhasService],
    }).compile();

    service = module.get<PessoasSenhasService>(PessoasSenhasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
