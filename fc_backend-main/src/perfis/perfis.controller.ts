import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { PerfisService } from './perfis.service';
import { CreatePerfiDto } from './dto/create-perfi.dto';
import { UpdatePerfiDto } from './dto/update-perfi.dto';
import { UUID } from 'crypto';

@Controller('perfis')
export class PerfisController {
  constructor(private readonly perfisService: PerfisService) {}

  @Post()
  create(@Body() createPerfiDto: CreatePerfiDto) {
    return this.perfisService.create(createPerfiDto);
  }

  @Get()
  findAll() {
    return this.perfisService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.perfisService.findOneById(id);
    } catch (err) {
      throw new NotFoundException('Perfil não encontrado');
    }
  }

  @Get('uuid/:uuid')
  async findOneByUUID(@Param('uuid') uuid: UUID) {
    try {
      return await this.perfisService.findOneByUUID(uuid);
    } catch (err) {
      throw new NotFoundException('Perfil não encontrado');
    }
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfiDto: UpdatePerfiDto) {
    return this.perfisService.update(+id, updatePerfiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfisService.remove(+id);
  }
}
