import { Test, TestingModule } from '@nestjs/testing';
import { PessoasGruposItensController } from './pessoas_grupos-itens.controller';
import { PessoasGruposItensService } from './pessoas_grupos-itens.service';

describe('PessoasGruposItensController', () => {
  let controller: PessoasGruposItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasGruposItensController],
      providers: [PessoasGruposItensService],
    }).compile();

    controller = module.get<PessoasGruposItensController>(PessoasGruposItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
