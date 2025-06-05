import { Injectable } from '@nestjs/common';
import { CreatePedidosItenDto } from './dto/create-pedidos_iten.dto';
import { UpdatePedidosItenDto } from './dto/update-pedidos_iten.dto';

@Injectable()
export class PedidosItensService {
  create(createPedidosItenDto: CreatePedidosItenDto) {
    return 'This action adds a new pedidosIten';
  }

  findAll() {
    return `This action returns all pedidosItens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedidosIten`;
  }

  update(id: number, updatePedidosItenDto: UpdatePedidosItenDto) {
    return `This action updates a #${id} pedidosIten`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidosIten`;
  }
}
