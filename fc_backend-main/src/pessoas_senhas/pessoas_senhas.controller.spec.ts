import { Test, TestingModule } from '@nestjs/testing';
import { PessoasSenhasController } from './pessoas_senhas.controller';
import { PessoasSenhasService } from './pessoas_senhas.service';

describe('PessoasSenhasController', () => {
  let controller: PessoasSenhasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasSenhasController],
      providers: [PessoasSenhasService],
    }).compile();

    controller = module.get<PessoasSenhasController>(PessoasSenhasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
