import { Injectable } from '@nestjs/common';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { Tipo } from './entities/tipo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../status/entities/status.entity';
import { UUID } from 'crypto';

@Injectable()
export class TiposService {
  constructor(
    @InjectRepository(Tipo) private tiposRepository: Repository<Tipo>,
  ) {}

  create(createTipoDto: CreateTipoDto) {
    const newTipo: Tipo = this.tiposRepository.create(createTipoDto);

    return this.tiposRepository.save(newTipo);
  }

  findAll() {
    return this.tiposRepository.find({
      where: {
        status: {
          nome: 'Ativo',
        },       
      },
      withDeleted: false
    });
  }

  findOneById(id: number) {
    return this.tiposRepository.findOneOrFail({
      where: {
        id,
      },
      withDeleted: false
    });
  }

  findOneByUUID(uuid: UUID) {
    return this.tiposRepository.findOneOrFail({    
      where: {
        uuid,
      },
      withDeleted: false
    });
  }

  update(id: number, updateTipoDto: UpdateTipoDto) {
    return `This action updates a #${id} tipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipo`;
  }
}
