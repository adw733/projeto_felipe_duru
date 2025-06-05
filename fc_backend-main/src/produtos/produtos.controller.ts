import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards, NotFoundException, Put, ParseIntPipe } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CommonService } from '../common/common/common.service';
import { AuthGuard } from '../auth/auth.guard';
import { UUID } from 'crypto';

@UseGuards(AuthGuard)
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService, private readonly commonService: CommonService) {}

  @Post()
  async create(@Request() req: Request, @Body() createProdutoDto: CreateProdutoDto) {
    return await this.produtosService.create(req, createProdutoDto);
  }

  @Get()
  findAll(@Request() req: Request, @Query() params?: any) {
    return this.produtosService.findAll(req, this.commonService.adjustQueryParams(params));
  }

  @Get('autocomplete/:tipoId/:search')
  async findAutocomplete(@Request() req: Request, @Param('search') search: string, @Param('tipoId', ParseIntPipe) tipoId: number) {
    return await this.produtosService.findAutocomplete(req, search, tipoId);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: UUID) {
    try {
      return await this.produtosService.findOne(uuid);
    } catch (err) {
      throw new NotFoundException('Produto não encontrado');
    }
  }

  @Put(':uuid')
  update(@Request() req: Request, @Param('uuid') uuid: UUID, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(req, uuid, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
