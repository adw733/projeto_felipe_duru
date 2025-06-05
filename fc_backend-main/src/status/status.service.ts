import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { UUID } from 'crypto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepository: Repository<Status>,
  ) {}

  async create(createStatusDto: CreateStatusDto) {
    const newStatus: Status = this.statusRepository.create(createStatusDto);

    return this.statusRepository.save(newStatus);
  }

  findAll() {
    return this.statusRepository.find({
      where: {
        deletedAt: null,
      },
      withDeleted: false
    });
  }

  findOneById(id: number) {
    return this.statusRepository.findOneOrFail({ 
      where: {
        id
      },
      withDeleted: false
     });
  }

  findOneByUUID(uuid: UUID) {
    return this.statusRepository.findOneOrFail({ 
      where: {
        uuid
      },
      withDeleted: false
     });
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return `This action updates a #${id} status`;
  }

  remove(id: number) {
    return `This action removes a #${id} status`;
  }
}
