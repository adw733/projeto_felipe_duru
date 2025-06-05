import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { MenusPerfisService } from './menus_perfis.service';
import { CreateMenusPerfiDto } from './dto/create-menus_perfi.dto';
import { UpdateMenusPerfiDto } from './dto/update-menus_perfi.dto';
import { UUID } from 'crypto';

@Controller('menus-perfis')
export class MenusPerfisController {
  constructor(private readonly menusPerfisService: MenusPerfisService) {}

  @Post()
  create(@Body() createMenusPerfiDto: CreateMenusPerfiDto) {
    return this.menusPerfisService.create(createMenusPerfiDto);
  }

  @Get()
  findAll() {
    return this.menusPerfisService.findAll();
  }


  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.menusPerfisService.findOneById(id);
    } catch (err) {
      throw new NotFoundException('Menu perfil não encontrado');
    }
  }

  @Get('uuid/:uuid')
  async findOneByUUID(@Param('uuid') uuid: UUID) {
    try {
      return await this.menusPerfisService.findOneByUUID(uuid);
    } catch (err) {
      throw new NotFoundException('Menu perfil não encontrado');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenusPerfiDto: UpdateMenusPerfiDto) {
    return this.menusPerfisService.update(+id, updateMenusPerfiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusPerfisService.remove(+id);
  }
}
