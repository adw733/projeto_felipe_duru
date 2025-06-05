import { Injectable } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from './entities/grupo.entity';
import { UUID } from 'crypto';

@Injectable()
export class GruposService {
  constructor(
    @InjectRepository(Grupo) private gruposRepository: Repository<Grupo>
  ) {}

  create(createGrupoDto: CreateGrupoDto) {
    return 'This action adds a new grupo';
  }

  findAll() {
    return this.gruposRepository.find({      
      where: {
        status: {
          nome: 'Ativo'
        },
      },
      withDeleted: false
    });
  }

  findOneById(id: number) {
    return this.gruposRepository.findOneOrFail({       
      where: {
        id
      },
      withDeleted: false
     });
  }

  findOneByUUID(uuid: UUID) {
    return this.gruposRepository.findOneOrFail({       
      relations:{
        status: true, 
        tiposIten: true, 
      }, 
      where: {
        uuid
      },
      withDeleted: false
     });
  }

  update(id: number, updateGrupoDto: UpdateGrupoDto) {
    return `This action updates a #${id} grupo`;
  }

  remove(id: number) {
    return `This action removes a #${id} grupo`;
  }
}
