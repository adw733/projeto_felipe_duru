import { Test, TestingModule } from '@nestjs/testing';
import { TiposItensController } from './tipos_itens.controller';
import { TiposItensService } from './tipos_itens.service';

describe('TiposItensController', () => {
  let controller: TiposItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposItensController],
      providers: [TiposItensService],
    }).compile();

    controller = module.get<TiposItensController>(TiposItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
