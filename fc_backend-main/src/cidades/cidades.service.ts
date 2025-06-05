import { Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cidade } from './entities/cidade.entity';
import { In, Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class CidadesService {
  constructor(
    @InjectRepository(Cidade) private cidadesRepository: Repository<Cidade>,
  ) {}

  create(createCidadeDto: CreateCidadeDto) {
    return 'This action adds a new cidade';
  }

  findAll() {
    return this.cidadesRepository.find({
      where: {
        status: {
          nome: 'Ativo',
        },
      },
      withDeleted: false
    });
  }

  findOneById(id: number) {
    return this.cidadesRepository.findOneOrFail({ 
      where: {
        id
      },
      withDeleted: false
     });
  }

  findOneByUUID(uuid: UUID) {
    return this.cidadesRepository.findOneOrFail({       
      where: {
        uuid
      },
      withDeleted: false
     });
  }

  findAllFornecedores(params: any) {
    const estadosIds = params.estadosIds
     ? { estadoId: In(params.estadosIds) }
     : {};
     
    return this.cidadesRepository.find({
      select: {
        pessoasEnderecos: {
          pessoas: {}
        }
      } ,     
      relations:{
        pessoasEnderecos: {
          pessoas: true
        }
      },
      where: {
        pessoasEnderecos: {
          pessoas: {
            isFornecedor: true, 
            statusId: 2
          }
        }, 
        ...estadosIds
      },
      withDeleted: false
     });
  }

  update(id: number, updateCidadeDto: UpdateCidadeDto) {
    return `This action updates a #${id} cidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} cidade`;
  }
}
