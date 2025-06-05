import { Test, TestingModule } from '@nestjs/testing';
import { PessoasSitesService } from './pessoas_sites.service';

describe('PessoasSitesService', () => {
  let service: PessoasSitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasSitesService],
    }).compile();

    service = module.get<PessoasSitesService>(PessoasSitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
