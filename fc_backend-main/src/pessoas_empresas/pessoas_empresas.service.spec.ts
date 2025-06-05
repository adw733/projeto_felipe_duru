import { Test, TestingModule } from '@nestjs/testing';
import { PessoasEmpresasService } from './pessoas_empresas.service';

describe('PessoasEmpresasService', () => {
  let service: PessoasEmpresasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasEmpresasService],
    }).compile();

    service = module.get<PessoasEmpresasService>(PessoasEmpresasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
