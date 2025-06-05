import { Controller, Get, Post, Body, Put, Request, UseGuards } from '@nestjs/common';
import { CotacoesItensRespostasService } from './cotacoes_itens_respostas.service';
import { CreateCotacoesItensRespostaDto } from './dto/create-cotacoes_itens_resposta.dto';
import { UpdateCotacoesItensRespostaDto } from './dto/update-cotacoes_itens_resposta.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('cotacoes-itens-respostas')
export class CotacoesItensRespostasController {
  constructor(private readonly cotacoesItensRespostasService: CotacoesItensRespostasService) {}

  @Post()
  create(@Request() req: Request, @Body() createCotacoesItensRespostaDto: CreateCotacoesItensRespostaDto) {
    return this.cotacoesItensRespostasService.create(req, createCotacoesItensRespostaDto);
  }

  @Put()
  update(@Request() req: Request, @Body() createCotacoesItensRespostaDto: CreateCotacoesItensRespostaDto) {
    return this.cotacoesItensRespostasService.update(req, createCotacoesItensRespostaDto);
  }
}
