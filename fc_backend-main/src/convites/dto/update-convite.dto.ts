import { PartialType } from '@nestjs/mapped-types';
import { CreateConviteDto } from './create-convite.dto';

export class UpdateConviteDto extends PartialType(CreateConviteDto) {}
