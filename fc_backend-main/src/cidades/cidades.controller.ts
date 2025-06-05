import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { UUID } from 'crypto';
import { CommonService } from '../common/common/common.service';

@Controller('cidades')
export class CidadesController {
  constructor(
    private readonly cidadesService: CidadesService,
    private readonly commonService: CommonService,
  ) {}

  @Post()
  create(@Body() createCidadeDto: CreateCidadeDto) {
    return this.cidadesService.create(createCidadeDto);
  }

  @Get()
  findAll() {
    return this.cidadesService.findAll();
  }

  @Get('lista/fornecedores')
  findAllFornecedores(@Query() params?: any) {
    return this.cidadesService.findAllFornecedores(
      this.commonService.adjustQueryParams(params),
    );
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.cidadesService.findOneById(id);
    } catch (err) {
      throw new NotFoundException('Cidade não encontrado');
    }
  }

  @Get('uuid/:uuid')
  async findOneByUUID(@Param('uuid') uuid: UUID) {
    try {
      return await this.cidadesService.findOneByUUID(uuid);
    } catch (err) {
      throw new NotFoundException('Cidade não encontrado');
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCidadeDto: UpdateCidadeDto) {
    return this.cidadesService.update(+id, updateCidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cidadesService.remove(+id);
  }
}
