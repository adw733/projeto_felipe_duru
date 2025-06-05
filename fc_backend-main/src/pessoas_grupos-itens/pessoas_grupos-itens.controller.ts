import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasGruposItensService } from './pessoas_grupos-itens.service';
import { CreatePessoasGruposItenDto } from './dto/create-pessoas_grupos-iten.dto';
import { UpdatePessoasGruposItenDto } from './dto/update-pessoas_grupos-iten.dto';

@Controller('pessoas-grupos-itens')
export class PessoasGruposItensController {
  constructor(private readonly pessoasGruposItensService: PessoasGruposItensService) {}

  @Post()
  create(@Body() createPessoasGruposItenDto: CreatePessoasGruposItenDto) {
    return this.pessoasGruposItensService.create(createPessoasGruposItenDto);
  }

  @Get()
  findAll() {
    return this.pessoasGruposItensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasGruposItensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoasGruposItenDto: UpdatePessoasGruposItenDto) {
    return this.pessoasGruposItensService.update(+id, updatePessoasGruposItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasGruposItensService.remove(+id);
  }
}
