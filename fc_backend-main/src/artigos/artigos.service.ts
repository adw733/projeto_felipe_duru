import { Injectable } from '@nestjs/common';
import { CreateArtigoDto } from './dto/create-artigo.dto';
import { UpdateArtigoDto } from './dto/update-artigo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Artigo } from './entities/artigo.entity';
import { UUID } from 'crypto';
import { CommonService } from '../common/common/common.service';
import { AnexosService } from '../anexos/anexos.service';

@Injectable()
export class ArtigosService {
  constructor(
    @InjectRepository(Artigo) private artigoRepository: Repository<Artigo>,
    private readonly commonService: CommonService,
    private readonly anexoService: AnexosService,
  ) {}

  async create(createArtigoDto: CreateArtigoDto) {
    const newArtigo: Artigo = this.artigoRepository.create(createArtigoDto);

    return await this.artigoRepository.save(newArtigo);
  }

  async findAll(params: any) {
    const [data, total] = await this.artigoRepository.findAndCount({
      where: [
        {
          id: params.idSearch,           
          dataPublicacao: Not(IsNull())
        },
        {
          titulo: this.commonService.UIlike(params.search || ""),
          dataPublicacao: Not(IsNull())
        },
        {
          resumo: this.commonService.UIlike(params.search || ""),          
          dataPublicacao: Not(IsNull())
        },        
        {
          texto: this.commonService.UIlike(params.search || ""),          
          dataPublicacao: Not(IsNull())
        },        
        {
          autor: this.commonService.UIlike(params.search || ""),          
          dataPublicacao: Not(IsNull())
        },        
        {
          tags: this.commonService.UIlike(params.search || ""),          
          dataPublicacao: Not(IsNull())
        },        
      ],
      order: {        
        titulo: 'ASC',
        dataPublicacao: 'ASC'
      },
      take: params.take, 
      skip: params.skip,
      withDeleted: false,
    });

    for(const artigo of data) {
      artigo.anexo = await this.anexoService.findOne(artigo.id, 1303);
    }


    return {data, total}
  }

  async findOne(uuid: UUID) {
    const artigo = await this.artigoRepository.findOneOrFail({
      where: {
        uuid,
      },
    });

    artigo.anexo = await this.anexoService.findOne(artigo.id, 1303);

    return artigo;
  }

  async update(uuid: UUID, updateArtigoDto: UpdateArtigoDto) {
    const artigo = await this.findOne(uuid);

    return this.artigoRepository.save({ ...artigo, ...updateArtigoDto });
  }

  remove(id: number) {
    return this.artigoRepository.delete(id);
  }
}
