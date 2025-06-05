import { Injectable } from '@nestjs/common';
import { CreateTiposItenDto } from './dto/create-tipos_iten.dto';
import { UpdateTiposItenDto } from './dto/update-tipos_iten.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiposIten } from './entities/tipos_iten.entity';
import { UUID } from 'crypto';

@Injectable()
export class TiposItensService {
  constructor(
    @InjectRepository(TiposIten)
    private tiposItenRepository: Repository<TiposIten>,
  ) {}

  create(createTiposItenDto: CreateTiposItenDto) {
    return 'This action adds a new tiposIten';
  }

  findAll() {
    return this.tiposItenRepository.find({
      where: {
        status: {
          nome: 'Ativo',
        },
        deletedAt: null,
      },
      withDeleted: false
    });
  }

  findOneById(id: number) {
    return this.tiposItenRepository.findOneOrFail({      
      where: {
        id,
      },
      withDeleted: false
    });
  }

  async findOneByNome(nome: string) {
    return await this.tiposItenRepository.findOneOrFail({      
      where: {
        nome,
      },
      withDeleted: false
    });
  }

  findOneByUUID(uuid: UUID) {
    return this.tiposItenRepository.findOneOrFail({    
      where: {
        uuid,
      },
      withDeleted: false
    });
  }

  update(id: number, updateTiposItenDto: UpdateTiposItenDto) {
    return `This action updates a #${id} tiposIten`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposIten`;
  }
}
