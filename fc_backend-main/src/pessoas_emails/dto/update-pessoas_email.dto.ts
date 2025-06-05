import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoasEmailDto } from './create-pessoas_email.dto';

export class UpdatePessoasEmailDto extends PartialType(CreatePessoasEmailDto) {}
