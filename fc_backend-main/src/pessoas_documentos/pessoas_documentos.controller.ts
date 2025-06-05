import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasDocumentosService } from './pessoas_documentos.service';
import { CreatePessoasDocumentoDto } from './dto/create-pessoas_documento.dto';
import { UpdatePessoasDocumentoDto } from './dto/update-pessoas_documento.dto';

@Controller('pessoas-documentos')
export class PessoasDocumentosController {
  constructor(private readonly pessoasDocumentosService: PessoasDocumentosService) {}

  @Post()
  create(@Body() createPessoasDocumentoDto: CreatePessoasDocumentoDto) {
    return this.pessoasDocumentosService.create(createPessoasDocumentoDto);
  }

  @Get()
  findAll() {
    return this.pessoasDocumentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasDocumentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoasDocumentoDto: UpdatePessoasDocumentoDto) {
    return this.pessoasDocumentosService.update(+id, updatePessoasDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasDocumentosService.remove(+id);
  }
}
