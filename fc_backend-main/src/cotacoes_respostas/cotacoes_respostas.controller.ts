import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CotacoesRespostasService } from './cotacoes_respostas.service';
import { CreateCotacoesRespostaDto } from './dto/create-cotacoes_resposta.dto';
import { UpdateCotacoesRespostaDto } from './dto/update-cotacoes_resposta.dto';

@Controller('cotacoes-respostas')
export class CotacoesRespostasController {
  constructor(private readonly cotacoesRespostasService: CotacoesRespostasService) {}

  @Get()
  findAll() {
    return this.cotacoesRespostasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotacoesRespostasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCotacoesRespostaDto: UpdateCotacoesRespostaDto) {
    return this.cotacoesRespostasService.update(+id, updateCotacoesRespostaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cotacoesRespostasService.remove(+id);
  }
}
