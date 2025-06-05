import { Test, TestingModule } from '@nestjs/testing';
import { PedidosParcelasService } from './pedidos_parcelas.service';

describe('PedidosParcelasService', () => {
  let service: PedidosParcelasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosParcelasService],
    }).compile();

    service = module.get<PedidosParcelasService>(PedidosParcelasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
