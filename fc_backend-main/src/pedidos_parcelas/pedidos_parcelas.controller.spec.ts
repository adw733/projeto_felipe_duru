import { Test, TestingModule } from '@nestjs/testing';
import { PedidosParcelasController } from './pedidos_parcelas.controller';
import { PedidosParcelasService } from './pedidos_parcelas.service';

describe('PedidosParcelasController', () => {
  let controller: PedidosParcelasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosParcelasController],
      providers: [PedidosParcelasService],
    }).compile();

    controller = module.get<PedidosParcelasController>(PedidosParcelasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
