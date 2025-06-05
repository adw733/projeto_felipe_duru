import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoasDocumentoDto } from './create-pessoas_documento.dto';

export class UpdatePessoasDocumentoDto extends PartialType(CreatePessoasDocumentoDto) {}
