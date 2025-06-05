import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoasEmpresaDto } from './create-pessoas_empresa.dto';

export class UpdatePessoasEmpresaDto extends PartialType(CreatePessoasEmpresaDto) {}
