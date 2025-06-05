import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasPerfisService } from './pessoas_perfis.service';
import { CreatePessoasPerfiDto } from './dto/create-pessoas_perfi.dto';
import { UpdatePessoasPerfiDto } from './dto/update-pessoas_perfi.dto';

@Controller('pessoas-perfis')
export class PessoasPerfisController {
  constructor(private readonly pessoasPerfisService: PessoasPerfisService) {}

  @Post()
  create(@Body() createPessoasPerfiDto: CreatePessoasPerfiDto) {
    return this.pessoasPerfisService.create(createPessoasPerfiDto);
  }

  @Get()
  findAll() {
    return this.pessoasPerfisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasPerfisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoasPerfiDto: UpdatePessoasPerfiDto) {
    return this.pessoasPerfisService.update(+id, updatePessoasPerfiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasPerfisService.remove(+id);
  }
}
