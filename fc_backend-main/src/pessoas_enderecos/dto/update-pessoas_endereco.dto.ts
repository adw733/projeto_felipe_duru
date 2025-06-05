import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoasEnderecoDto } from './create-pessoas_endereco.dto';

export class UpdatePessoasEnderecoDto extends PartialType(CreatePessoasEnderecoDto) {}
