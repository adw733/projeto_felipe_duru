import { Test, TestingModule } from '@nestjs/testing';
import { PedidosItensController } from './pedidos_itens.controller';
import { PedidosItensService } from './pedidos_itens.service';

describe('PedidosItensController', () => {
  let controller: PedidosItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosItensController],
      providers: [PedidosItensService],
    }).compile();

    controller = module.get<PedidosItensController>(PedidosItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
