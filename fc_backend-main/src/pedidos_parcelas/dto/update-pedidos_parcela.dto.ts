import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidosParcelaDto } from './create-pedidos_parcela.dto';

export class UpdatePedidosParcelaDto extends PartialType(CreatePedidosParcelaDto) {}
