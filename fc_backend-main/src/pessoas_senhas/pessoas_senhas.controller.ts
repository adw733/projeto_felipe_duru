import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PessoasSenhasService } from './pessoas_senhas.service';
import { CreatePessoasSenhaDto } from './dto/create-pessoas_senha.dto';
import { UpdatePessoasSenhaDto } from './dto/update-pessoas_senha.dto';

@Controller('pessoas-senhas')
export class PessoasSenhasController {
  constructor(private readonly pessoasSenhasService: PessoasSenhasService) {}

  @Post()
  create(@Body() createPessoasSenhaDto: CreatePessoasSenhaDto) {
    return this.pessoasSenhasService.create(createPessoasSenhaDto);
  }

  @Get()
  findAll() {
    return this.pessoasSenhasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasSenhasService.findOne(id);
  }

  @Get('pessoa/:pessoa_id')
  findOneByPessoa(@Param('pessoa_id', ParseIntPipe) pessoaId: number) {
    return this.pessoasSenhasService.findOneByPessoa(pessoaId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoasSenhaDto: UpdatePessoasSenhaDto) {
    return this.pessoasSenhasService.update(+id, updatePessoasSenhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasSenhasService.remove(+id);
  }
}
