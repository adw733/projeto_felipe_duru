import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { TiposItensService } from './tipos_itens.service';
import { CreateTiposItenDto } from './dto/create-tipos_iten.dto';
import { UpdateTiposItenDto } from './dto/update-tipos_iten.dto';
import { UUID } from 'crypto';

@Controller('tipos-itens')
export class TiposItensController {
  constructor(private readonly tiposItensService: TiposItensService) {}

  @Post()
  create(@Body() createTiposItenDto: CreateTiposItenDto) {
    return this.tiposItensService.create(createTiposItenDto);
  }

  @Get()
  findAll() {
    return this.tiposItensService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.tiposItensService.findOneById(id);
    } catch (err) {
      throw new NotFoundException('Tipo item não encontrado');
    }
  }

  @Get('uuid/:uuid')
  async findOneByUUID(@Param('uuid') uuid: UUID) {
    try {
      return await this.tiposItensService.findOneByUUID(uuid);
    } catch (err) {
      throw new NotFoundException('Tipo item não encontrado');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposItenDto: UpdateTiposItenDto) {
    return this.tiposItensService.update(+id, updateTiposItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposItensService.remove(+id);
  }
}
