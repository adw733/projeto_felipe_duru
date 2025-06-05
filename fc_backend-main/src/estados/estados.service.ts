import { Injectable } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { UUID } from 'crypto';

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(Estado) private estadosRepository: Repository<Estado>
  ) {}

  create(createEstadoDto: CreateEstadoDto) {
    return 'This action adds a new estado';
  }

  findAll() {
    return this.estadosRepository.find({         
      where: {
        status: {
          nome: 'Ativo'
        },    
      },
      withDeleted: false
    });
  }

  findOneById(id: number) {
    return this.estadosRepository.findOneOrFail({       
      where: {
        id
      },
      withDeleted: false
     });
  }

  findOneByUUID(uuid: UUID) {
    return this.estadosRepository.findOneOrFail({     
      where: {
        uuid
      },
      withDeleted: false
     });
  }

  findAllFornecedores() {
    return this.estadosRepository.find({
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
        }
      },
      withDeleted: false
     });
  }


  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return `This action updates a #${id} estado`;
  }

  remove(id: number) {
    return `This action removes a #${id} estado`;
  }
}
