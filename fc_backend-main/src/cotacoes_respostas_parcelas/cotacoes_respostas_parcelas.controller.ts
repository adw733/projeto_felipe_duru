import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CotacoesRespostasParcelasService } from './cotacoes_respostas_parcelas.service';
import { CreateCotacoesRespostasParcelaDto } from './dto/create-cotacoes_respostas_parcela.dto';
import { UpdateCotacoesRespostasParcelaDto } from './dto/update-cotacoes_respostas_parcela.dto';

@Controller('cotacoes-respostas-parcelas')
export class CotacoesRespostasParcelasController {
  constructor(private readonly cotacoesRespostasParcelasService: CotacoesRespostasParcelasService) {}

  @Post()
  create(@Body() createCotacoesRespostasParcelaDto: CreateCotacoesRespostasParcelaDto) {
    return this.cotacoesRespostasParcelasService.create(createCotacoesRespostasParcelaDto);
  }

  @Get()
  findAll() {
    return this.cotacoesRespostasParcelasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotacoesRespostasParcelasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCotacoesRespostasParcelaDto: UpdateCotacoesRespostasParcelaDto) {
    return this.cotacoesRespostasParcelasService.update(+id, updateCotacoesRespostasParcelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cotacoesRespostasParcelasService.remove(+id);
  }
}
