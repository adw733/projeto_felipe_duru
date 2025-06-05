import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutosGrupositenDto } from './create-produtos_grupositen.dto';

export class UpdateProdutosGrupositenDto extends PartialType(CreateProdutosGrupositenDto) {}
