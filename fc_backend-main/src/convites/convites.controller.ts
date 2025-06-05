import { Controller, Get, Post, Body, Request, Param, Delete, Query, NotFoundException, Put, UseGuards } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { CreateConviteDto } from './dto/create-convite.dto';
import { UpdateConviteDto } from './dto/update-convite.dto';
import { CommonService } from '../../src/common/common/common.service';
import { UUID } from 'crypto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('convites')
export class ConvitesController {
  constructor(
    private readonly convitesService: ConvitesService,
    private readonly commonService: CommonService,
  ) {}

  @Post()
  async create(@Body() createConviteDto: CreateConviteDto) {
    return await this.convitesService.create(createConviteDto);
  }

  // @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: Request, @Query() params?: any) {
    return await this.convitesService.findAll(req, 
      this.commonService.adjustQueryParams(params),
    );
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: UUID) {
    try {
      return await this.convitesService.findOne(uuid);
    } catch (err) {
      throw new NotFoundException('Convite não encontrado');
    }
  }

  @Put(':uuid')
  update(@Param('uuid') uuid: UUID, @Body() updateConviteDto: UpdateConviteDto) {
    return this.convitesService.update(uuid, updateConviteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.convitesService.remove(+id);
  }
}
