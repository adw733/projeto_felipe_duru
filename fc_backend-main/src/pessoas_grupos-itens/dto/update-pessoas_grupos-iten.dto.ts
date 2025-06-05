import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoasGruposItenDto } from './create-pessoas_grupos-iten.dto';

export class UpdatePessoasGruposItenDto extends PartialType(CreatePessoasGruposItenDto) {}
