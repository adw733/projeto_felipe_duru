import { Test, TestingModule } from '@nestjs/testing';
import { PessoasEmpresasController } from './pessoas_empresas.controller';
import { PessoasEmpresasService } from './pessoas_empresas.service';

describe('PessoasEmpresasController', () => {
  let controller: PessoasEmpresasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasEmpresasController],
      providers: [PessoasEmpresasService],
    }).compile();

    controller = module.get<PessoasEmpresasController>(PessoasEmpresasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
