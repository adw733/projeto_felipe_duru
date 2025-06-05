import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ArtigosService } from './artigos.service';
import { CreateArtigoDto } from './dto/create-artigo.dto';
import { UpdateArtigoDto } from './dto/update-artigo.dto';
import { CommonService } from '../common/common/common.service';
import { UUID } from 'crypto';

@Controller('artigos')
export class ArtigosController {
  constructor(
    private readonly artigosService: ArtigosService,
    private readonly commonService: CommonService,
  ) {}

  @Post()
  async create(@Body() createArtigoDto: CreateArtigoDto) {
    return await this.artigosService.create(createArtigoDto);
  }

  // @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() params?: any) {
    return await this.artigosService.findAll(
      this.commonService.adjustQueryParams(params),
    );
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: UUID) {
    try {
      return await this.artigosService.findOne(uuid);
    } catch (err) {
      throw new NotFoundException('Artigo não encontrado');
    }
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: UUID, @Body() updateArtigoDto: UpdateArtigoDto) {
    return await this.artigosService.update(uuid, updateArtigoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.artigosService.remove(+id);
  }
}
