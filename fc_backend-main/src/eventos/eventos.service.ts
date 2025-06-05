import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { UUID } from 'crypto';
import { CommonService } from '../common/common/common.service';
import { AnexosService } from '../anexos/anexos.service';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento) private eventoRepository: Repository<Evento>,
    private readonly commonService: CommonService,
    private readonly anexoService: AnexosService,
  ) {}

  async create(createEventoDto: CreateEventoDto) {
    const newEvento: Evento = this.eventoRepository.create(createEventoDto);

    return await this.eventoRepository.save(newEvento);
  }

  async findAll(params: any) {
    const dataInicio = params.dataInicio ? { data: MoreThanOrEqual(params.dataInicio) } : {}
    const dataFim = params.dataFim ? { data: LessThanOrEqual(params.dataFim) } : { data: MoreThanOrEqual(new Date()) }
    
    const [data, total] = await this.eventoRepository.findAndCount({
      where: [
        {
          id: params.idSearch,
          ...dataInicio,
          ...dataFim, 
          isPublicado: true
        },
        {
          titulo: this.commonService.UIlike(params.search || ""),
          ...dataInicio,
          ...dataFim,
          isPublicado: true
        },
        {
          resumo: this.commonService.UIlike(params.search || ""),
          ...dataInicio,
          ...dataFim,
          isPublicado: true
        },        
        {
          descricao: this.commonService.UIlike(params.search || ""),
          ...dataInicio,
          ...dataFim,
          isPublicado: true
        },        
        {
          palestrante: this.commonService.UIlike(params.search || ""),
          ...dataInicio,
          ...dataFim,
          isPublicado: true
        },        
      ],
      order: {
        data: 'ASC',
        titulo: 'ASC'
      },
      take: params.take, 
      skip: params.skip,
      withDeleted: false,
    });

    for(const evento of data) {
      evento.anexo = await this.anexoService.findOne(evento.id, 1302);
    }

    return {data, total}
  }

  async findOne(uuid: UUID) {
    const evento = await this.eventoRepository.findOneOrFail({
      where: {
        uuid,
      },
    });

    
    evento.anexo = await this.anexoService.findOne(evento.id, 1302);

    return evento;
  }

  async update(uuid: UUID, updateEventoDto: UpdateEventoDto) {
    const evento = await this.findOne(uuid);

    return this.eventoRepository.save({ ...evento, ...updateEventoDto });
  }

  remove(id: number) {
    return this.eventoRepository.delete(id);
  }
}
