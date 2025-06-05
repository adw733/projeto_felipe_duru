import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UUID } from 'crypto';
import { CommonService } from '../common/common/common.service';

@Controller('eventos')
export class EventosController {
  constructor(
    private readonly eventosService: EventosService,
    private readonly commonService: CommonService,
  ) {}

  @Post()
  async create(@Body() createEventoDto: CreateEventoDto) {
    return await this.eventosService.create(createEventoDto);
  }

  @Get()
  async findAll(@Query() params?: any) {
    return await this.eventosService.findAll(
      this.commonService.adjustQueryParams(params),
    );
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: UUID) {
    try {
      return await this.eventosService.findOne(uuid);
    } catch (err) {
      throw new NotFoundException('Evento não encontrado');
    }
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: UUID, @Body() updateEventoDto: UpdateEventoDto) {
    return await this.eventosService.update(uuid, updateEventoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.eventosService.remove(+id);
  }
}
