import { Test, TestingModule } from '@nestjs/testing';
import { PedidosItensService } from './pedidos_itens.service';

describe('PedidosItensService', () => {
  let service: PedidosItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosItensService],
    }).compile();

    service = module.get<PedidosItensService>(PedidosItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
