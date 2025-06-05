import { Module } from '@nestjs/common';
import { PedidosItensService } from './pedidos_itens.service';
import { PedidosItensController } from './pedidos_itens.controller';

@Module({
  controllers: [PedidosItensController],
  providers: [PedidosItensService]
})
export class PedidosItensModule {}
