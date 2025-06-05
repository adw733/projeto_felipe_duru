import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { AnexosService } from './anexos.service';
import { CreateAnexoDto } from './dto/create-anexo.dto';
import { UpdateAnexoDto } from './dto/update-anexo.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('anexos')
export class AnexosController {
  constructor(private readonly anexosService: AnexosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() anexo: any) {
    const createAnexoDto: CreateAnexoDto = typeof anexo.anexo == 'object' ? anexo : JSON.parse(anexo.anexo)
    return this.anexosService.create(createAnexoDto, file);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  update(@UploadedFile() file: Express.Multer.File, @Body() anexo: any) {
    const updateAnexoDto: UpdateAnexoDto = typeof anexo.anexo == 'object' ? anexo : JSON.parse(anexo.anexo)
    return this.anexosService.update(updateAnexoDto, file);
  }

  @Put('remove')
  remove(@Body() updateAnexoDto: UpdateAnexoDto) {    
    return this.anexosService.remove(updateAnexoDto);
  }
}
