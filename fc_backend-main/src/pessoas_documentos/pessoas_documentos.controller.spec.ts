import { Test, TestingModule } from '@nestjs/testing';
import { PessoasDocumentosController } from './pessoas_documentos.controller';
import { PessoasDocumentosService } from './pessoas_documentos.service';

describe('PessoasDocumentosController', () => {
  let controller: PessoasDocumentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasDocumentosController],
      providers: [PessoasDocumentosService],
    }).compile();

    controller = module.get<PessoasDocumentosController>(PessoasDocumentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
