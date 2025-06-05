import { Test, TestingModule } from '@nestjs/testing';
import { PessoasTelefonesService } from './pessoas_telefones.service';

describe('PessoasTelefonesService', () => {
  let service: PessoasTelefonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasTelefonesService],
    }).compile();

    service = module.get<PessoasTelefonesService>(PessoasTelefonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
