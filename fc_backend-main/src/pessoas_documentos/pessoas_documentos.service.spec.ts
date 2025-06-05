import { Test, TestingModule } from '@nestjs/testing';
import { PessoasDocumentosService } from './pessoas_documentos.service';

describe('PessoasDocumentosService', () => {
  let service: PessoasDocumentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasDocumentosService],
    }).compile();

    service = module.get<PessoasDocumentosService>(PessoasDocumentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
