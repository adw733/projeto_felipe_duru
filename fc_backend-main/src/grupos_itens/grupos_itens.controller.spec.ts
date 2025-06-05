import { Test, TestingModule } from '@nestjs/testing';
import { GruposItensController } from './grupos_itens.controller';
import { GruposItensService } from './grupos_itens.service';

describe('GruposItensController', () => {
  let controller: GruposItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GruposItensController],
      providers: [GruposItensService],
    }).compile();

    controller = module.get<GruposItensController>(GruposItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
