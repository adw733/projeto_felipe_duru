import { Test, TestingModule } from '@nestjs/testing';
import { PessoasSitesController } from './pessoas_sites.controller';
import { PessoasSitesService } from './pessoas_sites.service';

describe('PessoasSitesController', () => {
  let controller: PessoasSitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasSitesController],
      providers: [PessoasSitesService],
    }).compile();

    controller = module.get<PessoasSitesController>(PessoasSitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
