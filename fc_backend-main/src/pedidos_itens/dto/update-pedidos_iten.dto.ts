import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidosItenDto } from './create-pedidos_iten.dto';

export class UpdatePedidosItenDto extends PartialType(CreatePedidosItenDto) {}
