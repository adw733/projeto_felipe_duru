import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoasSenhaDto } from './create-pessoas_senha.dto';

export class UpdatePessoasSenhaDto extends PartialType(CreatePessoasSenhaDto) {}
