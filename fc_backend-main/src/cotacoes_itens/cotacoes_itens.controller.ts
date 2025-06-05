import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { CotacoesItensService } from './cotacoes_itens.service';
import { CreateCotacoesItenDto } from './dto/create-cotacoes_iten.dto';
import { UpdateCotacoesItenDto } from './dto/update-cotacoes_iten.dto';

@Controller('cotacoes-itens')
export class CotacoesItensController {
  constructor(private readonly cotacoesItensService: CotacoesItensService) {}

  @Post()
  create(@Body() createCotacoesItenDto: CreateCotacoesItenDto) {
    return this.cotacoesItensService.create(createCotacoesItenDto);
  }

  @Get()
  findAll() {
    return this.cotacoesItensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotacoesItensService.findOne(+id);
  }

  @Put()
  update(@Request() req: Request, @Body() updateCotacoesItenDto: UpdateCotacoesItenDto) {
    return this.cotacoesItensService.update(req, updateCotacoesItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cotacoesItensService.remove(+id);
  }
}
