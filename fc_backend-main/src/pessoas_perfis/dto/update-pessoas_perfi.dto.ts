import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoasPerfiDto } from './create-pessoas_perfi.dto';

export class UpdatePessoasPerfiDto extends PartialType(CreatePessoasPerfiDto) {}
