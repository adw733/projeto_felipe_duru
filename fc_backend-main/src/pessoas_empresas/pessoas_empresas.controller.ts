import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasEmpresasService } from './pessoas_empresas.service';
import { CreatePessoasEmpresaDto } from './dto/create-pessoas_empresa.dto';
import { UpdatePessoasEmpresaDto } from './dto/update-pessoas_empresa.dto';

@Controller('pessoas-empresas')
export class PessoasEmpresasController {
  constructor(private readonly pessoasEmpresasService: PessoasEmpresasService) {}

  @Post()
  create(@Body() createPessoasEmpresaDto: CreatePessoasEmpresaDto) {
    return this.pessoasEmpresasService.create(createPessoasEmpresaDto);
  }

  @Get()
  findAll() {
    return this.pessoasEmpresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasEmpresasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoasEmpresaDto: UpdatePessoasEmpresaDto) {
    return this.pessoasEmpresasService.update(+id, updatePessoasEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasEmpresasService.remove(+id);
  }
}
