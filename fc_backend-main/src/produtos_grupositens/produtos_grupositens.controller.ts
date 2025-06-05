import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutosGrupositensService } from './produtos_grupositens.service';
import { CreateProdutosGrupositenDto } from './dto/create-produtos_grupositen.dto';
import { UpdateProdutosGrupositenDto } from './dto/update-produtos_grupositen.dto';

@Controller('produtos-grupositens')
export class ProdutosGrupositensController {
  constructor(private readonly produtosGrupositensService: ProdutosGrupositensService) {}

  @Post()
  create(@Body() createProdutosGrupositenDto: CreateProdutosGrupositenDto) {
    // return this.produtosGrupositensService.create(createProdutosGrupositenDto);
  }

  @Get()
  findAll() {
    return this.produtosGrupositensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosGrupositensService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosGrupositensService.remove(+id);
  }
}
