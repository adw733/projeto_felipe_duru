import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Put, Request, Query, ParseUUIDPipe } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { UUID } from 'crypto';
import { CommonService } from '../common/common/common.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService,  private readonly commonService: CommonService) {}

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  findAll() {
    return this.pessoasService.findAll();
  }

  @Get('fornecedores')
  async findAllFornecedores(@Request() req: Request, @Query() params?: any) {
    return await this.pessoasService.findAllFornecedores(req, this.commonService.adjustQueryParams(params));
  }

  @Get('integrantes')
  @UseGuards(AuthGuard)
  async findAllIntegrantes(@Request() req: Request, @Query() params?: any) {
    return await this.pessoasService.findAllIntegrantes(req, this.commonService.adjustQueryParams(params));
  }

  @Post('integrantes')
  @UseGuards(AuthGuard)
  async createIntegrante(@Request() req: Request, @Body() createPessoaDto: CreatePessoaDto) {
    return await this.pessoasService.createIntegrante(req, createPessoaDto);
  }

  @Put('integrantes/:uuid')
  @UseGuards(AuthGuard)
  async updateIntegrante(@Request() req: Request, @Body() updatePessoaDto: UpdatePessoaDto) {
    return await this.pessoasService.updateIntegrante(req, updatePessoaDto);
  }

  @Get('integrantes/:uuid')
  @UseGuards(AuthGuard)
  async findOneIntegrante(@Request() req: Request, @Param('uuid', ParseUUIDPipe) uuid: UUID) {
    return await this.pessoasService.findOneIntegrante(req, uuid);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.findOne(id);
  }

  @Get('perfil/:id')
  findPerfil(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.findOnePerfil(id);
  }

  @Put()
  async update( @Body() updatePessoaDto: UpdatePessoaDto) {
    return await this.pessoasService.update(updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasService.remove(+id);
  }
}
