import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoasTelefoneDto } from './create-pessoas_telefone.dto';

export class UpdatePessoasTelefoneDto extends PartialType(CreatePessoasTelefoneDto) {}
