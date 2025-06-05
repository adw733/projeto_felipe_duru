import { Injectable } from '@nestjs/common';
import { CreateRegioeDto } from './dto/create-regioe.dto';
import { UpdateRegioeDto } from './dto/update-regioe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regioe } from './entities/regioe.entity';
import { UUID } from 'crypto';

@Injectable()
export class RegioesService {
  constructor(
    @InjectRepository(Regioe) private regioesRepository: Repository<Regioe>
  ) {}
  create(createRegioeDto: CreateRegioeDto) {
    return 'This action adds a new regioe';
  }

  findAll() {
    return this.regioesRepository.find({      
      where: {
        status: {
          nome: 'Ativo'
        },
      },
      withDeleted: false
    });
  }

  findOneById(id: number) {
    return this.regioesRepository.findOneOrFail({       
      where: {
        id
      },
      withDeleted: false
     });
  }

  findOneByUUID(uuid: UUID) {
    return this.regioesRepository.findOneOrFail({      
      where: {
        uuid
      },
      withDeleted: false
     });
  }


  update(id: number, updateRegioeDto: UpdateRegioeDto) {
    return `This action updates a #${id} regioe`;
  }

  remove(id: number) {
    return `This action removes a #${id} regioe`;
  }
}
