import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { RegioesService } from './regioes.service';
import { CreateRegioeDto } from './dto/create-regioe.dto';
import { UpdateRegioeDto } from './dto/update-regioe.dto';
import { UUID } from 'crypto';

@Controller('regioes')
export class RegioesController {
  constructor(private readonly regioesService: RegioesService) {}

  @Post()
  create(@Body() createRegioeDto: CreateRegioeDto) {
    return this.regioesService.create(createRegioeDto);
  }

  @Get()
  findAll() {
    return this.regioesService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.regioesService.findOneById(id);
    } catch (err) {
      throw new NotFoundException('Região não encontrado');
    }
  }

  @Get('uuid/:uuid')
  async findOneByUUID(@Param('uuid') uuid: UUID) {
    try {
      return await this.regioesService.findOneByUUID(uuid);
    } catch (err) {
      throw new NotFoundException('Região não encontrado');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegioeDto: UpdateRegioeDto) {
    return this.regioesService.update(+id, updateRegioeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regioesService.remove(+id);
  }
}
