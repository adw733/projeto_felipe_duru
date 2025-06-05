import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosGrupositensController } from './produtos_grupositens.controller';
import { ProdutosGrupositensService } from './produtos_grupositens.service';

describe('ProdutosGrupositensController', () => {
  let controller: ProdutosGrupositensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosGrupositensController],
      providers: [ProdutosGrupositensService],
    }).compile();

    controller = module.get<ProdutosGrupositensController>(ProdutosGrupositensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
