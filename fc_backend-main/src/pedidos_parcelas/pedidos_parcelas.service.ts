import { Injectable } from '@nestjs/common';
import { CreatePedidosParcelaDto } from './dto/create-pedidos_parcela.dto';
import { UpdatePedidosParcelaDto } from './dto/update-pedidos_parcela.dto';

@Injectable()
export class PedidosParcelasService {
  create(createPedidosParcelaDto: CreatePedidosParcelaDto) {
    return 'This action adds a new pedidosParcela';
  }

  findAll() {
    return `This action returns all pedidosParcelas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedidosParcela`;
  }

  update(id: number, updatePedidosParcelaDto: UpdatePedidosParcelaDto) {
    return `This action updates a #${id} pedidosParcela`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidosParcela`;
  }
}
