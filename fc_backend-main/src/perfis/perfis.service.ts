import { Injectable } from '@nestjs/common';
import { CreatePerfiDto } from './dto/create-perfi.dto';
import { UpdatePerfiDto } from './dto/update-perfi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfi } from './entities/perfi.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class PerfisService {
  constructor(
    @InjectRepository(Perfi) private perfisRepository: Repository<Perfi>
  ) {}

  create(createPerfiDto: CreatePerfiDto) {
    return 'This action adds a new perfi';
  }

  findAll() {
    return this.perfisRepository.find({      
      where: {
        status: {
          nome: 'Ativo'
        },
      },
      withDeleted: false
    });
  }

  findOneById(id: number) {
    return this.perfisRepository.findOneOrFail({       
      where: {
        id
      },
      withDeleted: false
     });
  }

  findOneByUUID(uuid: UUID) {
    return this.perfisRepository.findOneOrFail({       
      where: {
        uuid
      },
      withDeleted: false
     });
  }

  update(id: number, updatePerfiDto: UpdatePerfiDto) {
    return `This action updates a #${id} perfi`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfi`;
  }
}
