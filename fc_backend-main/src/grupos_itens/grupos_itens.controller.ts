import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { GruposItensService } from './grupos_itens.service';
import { CreateGruposItenDto } from './dto/create-grupos_iten.dto';
import { UpdateGruposItenDto } from './dto/update-grupos_iten.dto';
import { UUID } from 'crypto';

@Controller('grupos-itens')
export class GruposItensController {
  constructor(private readonly gruposItensService: GruposItensService) {}

  @Post()
  create(@Body() createGruposItenDto: CreateGruposItenDto) {
    return this.gruposItensService.create(createGruposItenDto);
  }

  @Get()
  findAll() {
    return this.gruposItensService.findAll();
  }

  @Get('autocomplete/:tipoId/:search')
  async findAutocomplete(@Param('search') search: string, @Param('tipoId', ParseIntPipe) tipoId: number) {
    return await this.gruposItensService.findAutocomplete(search, tipoId);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.gruposItensService.findOneById(id);
    } catch (err) {
      throw new NotFoundException('Grupo item não encontrado');
    }
  }

  @Get('uuid/:uuid')
  async findOneByUUID(@Param('uuid') uuid: UUID) {
    try {
      return await this.gruposItensService.findOneByUUID(uuid);
    } catch (err) {
      throw new NotFoundException('Grupo item não encontrado');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGruposItenDto: UpdateGruposItenDto) {
    return this.gruposItensService.update(+id, updateGruposItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gruposItensService.remove(+id);
  }
}
