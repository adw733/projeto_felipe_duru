import { Module } from '@nestjs/common';
import { PedidosParcelasService } from './pedidos_parcelas.service';
import { PedidosParcelasController } from './pedidos_parcelas.controller';

@Module({
  controllers: [PedidosParcelasController],
  providers: [PedidosParcelasService]
})
export class PedidosParcelasModule {}
