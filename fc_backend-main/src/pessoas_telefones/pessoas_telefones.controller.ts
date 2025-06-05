import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasTelefonesService } from './pessoas_telefones.service';
import { CreatePessoasTelefoneDto } from './dto/create-pessoas_telefone.dto';
import { UpdatePessoasTelefoneDto } from './dto/update-pessoas_telefone.dto';

@Controller('pessoas-telefones')
export class PessoasTelefonesController {
  constructor(private readonly pessoasTelefonesService: PessoasTelefonesService) {}

  @Post()
  create(@Body() createPessoasTelefoneDto: CreatePessoasTelefoneDto) {
    return this.pessoasTelefonesService.create(createPessoasTelefoneDto);
  }

  @Get()
  findAll() {
    return this.pessoasTelefonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasTelefonesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoasTelefoneDto: UpdatePessoasTelefoneDto) {
    return this.pessoasTelefonesService.update(+id, updatePessoasTelefoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasTelefonesService.remove(+id);
  }
}
