import { Test, TestingModule } from '@nestjs/testing';
import { PessoasEnderecosController } from './pessoas_enderecos.controller';
import { PessoasEnderecosService } from './pessoas_enderecos.service';

describe('PessoasEnderecosController', () => {
  let controller: PessoasEnderecosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasEnderecosController],
      providers: [PessoasEnderecosService],
    }).compile();

    controller = module.get<PessoasEnderecosController>(PessoasEnderecosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
