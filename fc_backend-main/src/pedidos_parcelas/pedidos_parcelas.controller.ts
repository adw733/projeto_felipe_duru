import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidosParcelasService } from './pedidos_parcelas.service';
import { CreatePedidosParcelaDto } from './dto/create-pedidos_parcela.dto';
import { UpdatePedidosParcelaDto } from './dto/update-pedidos_parcela.dto';

@Controller('pedidos-parcelas')
export class PedidosParcelasController {
  constructor(private readonly pedidosParcelasService: PedidosParcelasService) {}

  @Post()
  create(@Body() createPedidosParcelaDto: CreatePedidosParcelaDto) {
    return this.pedidosParcelasService.create(createPedidosParcelaDto);
  }

  @Get()
  findAll() {
    return this.pedidosParcelasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosParcelasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidosParcelaDto: UpdatePedidosParcelaDto) {
    return this.pedidosParcelasService.update(+id, updatePedidosParcelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosParcelasService.remove(+id);
  }
}
