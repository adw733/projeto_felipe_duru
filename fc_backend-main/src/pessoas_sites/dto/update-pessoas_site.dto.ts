import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoasSiteDto } from './create-pessoas_site.dto';

export class UpdatePessoasSiteDto extends PartialType(CreatePessoasSiteDto) {}
