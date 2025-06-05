import { Test, TestingModule } from '@nestjs/testing';
import { PessoasTelefonesController } from './pessoas_telefones.controller';
import { PessoasTelefonesService } from './pessoas_telefones.service';

describe('PessoasTelefonesController', () => {
  let controller: PessoasTelefonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasTelefonesController],
      providers: [PessoasTelefonesService],
    }).compile();

    controller = module.get<PessoasTelefonesController>(PessoasTelefonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
