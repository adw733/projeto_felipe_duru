import { Injectable } from '@nestjs/common';
import { CreateConviteDto } from './dto/create-convite.dto';
import { UpdateConviteDto } from './dto/update-convite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CommonService } from '../common/common/common.service';
import { Convite } from './entities/convite.entity';
import { UUID } from 'crypto';

@Injectable()
export class ConvitesService {
  constructor(
    @InjectRepository(Convite) private conviteRepository: Repository<Convite>,
    private readonly commonService: CommonService,
  ) {}

  async create(createConviteDto: CreateConviteDto) {
    const newConvite: Convite = this.conviteRepository.create(createConviteDto);

    return await this.conviteRepository.save(newConvite);
  }

  async findAll(req: Request, params: any) {
    const pessoaId = req['user'].id;

    const [data, total] = await this.conviteRepository.findAndCount({
      where: [
        {
          id: params.idSearch,
          pessoaId
        },        
        {
          nomeEmpresa: this.commonService.UIlike(params.search || ""), 
          pessoaId
        },        
        {
          nomeContato: this.commonService.UIlike(params.search || ""), 
          pessoaId
        },        
        {
          documentoEmpresa: this.commonService.UIlike(params.search || ""), 
          pessoaId
        },        
      ],
      order: {  
        id: 'DESC'      
      },
      take: params.take, 
      skip: params.skip,
      withDeleted: false,
    });

    return {data, total}
  }

  findOne(uuid: UUID) {
    return this.conviteRepository.findOneOrFail({
      where: {
        uuid,
      },
    });
  }

  async update(uuid: UUID, updateConviteDto: UpdateConviteDto) {
    const convite = await this.findOne(uuid);

    return this.conviteRepository.save({ ...convite, ...updateConviteDto });
  }

  remove(id: number) {
    return this.conviteRepository.delete(id);
  }
}
