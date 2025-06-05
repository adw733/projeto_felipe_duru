import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards, NotFoundException, Put } from '@nestjs/common';
import { CotacoesService } from './cotacoes.service';
import { CreateCotacoeDto } from './dto/create-cotacoe.dto';
import { UpdateCotacoeDto } from './dto/update-cotacoe.dto';
import { CommonService } from '../common/common/common.service';
import { AuthGuard } from '../auth/auth.guard';
import { UUID } from 'crypto';

@UseGuards(AuthGuard)
@Controller('cotacoes')
export class CotacoesController {
  constructor(private readonly cotacoesService: CotacoesService,  private readonly commonService: CommonService) {}

  @Post()
  create(@Request() req: Request, @Body() createCotacoeDto: CreateCotacoeDto) {
    return this.cotacoesService.create(req, createCotacoeDto);
  }

  @Get()
  findAll(@Request() req: Request, @Query() params?: any) {
    return this.cotacoesService.findAll(req, this.commonService.adjustQueryParams(params));
  }

  @Get(':uuid')
  async findOne(@Request() req: Request, @Param('uuid') uuid: UUID, @Query() params?: any) {
    try {
      return await this.cotacoesService.findOne(req, uuid, this.commonService.adjustQueryParams(params));
    } catch (err) {
      throw new NotFoundException('Cotação não encontrado');
    }
  }

  @Put(':uuid')
  async update(@Request() req: Request, @Param('uuid') uuid: UUID,  @Body() updateCotacoeDto: UpdateCotacoeDto) {
    return await this.cotacoesService.update(req, uuid, updateCotacoeDto);
  }
  
  @Put('encaminhar/:uuid')
  async encaminhar(@Request() req: Request, @Param('uuid') uuid: UUID,  @Body() updateCotacoeDto: UpdateCotacoeDto) {
    return await this.cotacoesService.encaminhar(req, uuid, updateCotacoeDto);
  }
  
  @Put('gerarpedido/:uuid')
  async gerarpedido(@Request() req: Request, @Param('uuid') uuid: UUID,  @Body() updateCotacoeDto: UpdateCotacoeDto) {
    return await this.cotacoesService.gerarpedido(req, uuid, updateCotacoeDto);
  }
  
  @Put('aprovacao/:uuid')
  async aprovacao(@Request() req: Request, @Param('uuid') uuid: UUID,  @Body() updateCotacoeDto: UpdateCotacoeDto) {
    return await this.cotacoesService.aprovacao(req, uuid, updateCotacoeDto);
  }
  
  @Put('reprova/:uuid')
  async reprova(@Request() req: Request, @Param('uuid') uuid: UUID,  @Body() updateCotacoeDto: UpdateCotacoeDto) {
    return await this.cotacoesService.reprova(req, uuid, updateCotacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cotacoesService.remove(+id);
  }
}
