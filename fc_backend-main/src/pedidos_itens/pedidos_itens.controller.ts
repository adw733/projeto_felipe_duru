import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidosItensService } from './pedidos_itens.service';
import { CreatePedidosItenDto } from './dto/create-pedidos_iten.dto';
import { UpdatePedidosItenDto } from './dto/update-pedidos_iten.dto';

@Controller('pedidos-itens')
export class PedidosItensController {
  constructor(private readonly pedidosItensService: PedidosItensService) {}

  @Post()
  create(@Body() createPedidosItenDto: CreatePedidosItenDto) {
    return this.pedidosItensService.create(createPedidosItenDto);
  }

  @Get()
  findAll() {
    return this.pedidosItensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosItensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidosItenDto: UpdatePedidosItenDto) {
    return this.pedidosItensService.update(+id, updatePedidosItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosItensService.remove(+id);
  }
}
