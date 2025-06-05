import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasSitesService } from './pessoas_sites.service';
import { CreatePessoasSiteDto } from './dto/create-pessoas_site.dto';
import { UpdatePessoasSiteDto } from './dto/update-pessoas_site.dto';

@Controller('pessoas-sites')
export class PessoasSitesController {
  constructor(private readonly pessoasSitesService: PessoasSitesService) {}

  @Post()
  create(@Body() createPessoasSiteDto: CreatePessoasSiteDto) {
    return this.pessoasSitesService.create(createPessoasSiteDto);
  }

  @Get()
  findAll() {
    return this.pessoasSitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasSitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoasSiteDto: UpdatePessoasSiteDto) {
    return this.pessoasSitesService.update(+id, updatePessoasSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasSitesService.remove(+id);
  }
}
