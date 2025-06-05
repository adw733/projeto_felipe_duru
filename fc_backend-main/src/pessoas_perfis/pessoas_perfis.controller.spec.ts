import { Test, TestingModule } from '@nestjs/testing';
import { PessoasPerfisController } from './pessoas_perfis.controller';
import { PessoasPerfisService } from './pessoas_perfis.service';

describe('PessoasPerfisController', () => {
  let controller: PessoasPerfisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasPerfisController],
      providers: [PessoasPerfisService],
    }).compile();

    controller = module.get<PessoasPerfisController>(PessoasPerfisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
