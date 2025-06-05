import { Injectable } from '@nestjs/common';
import { CreateNotificacoeDto } from './dto/create-notificacoe.dto';
import { UpdateNotificacoeDto } from './dto/update-notificacoe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacoe } from './entities/notificacoe.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class NotificacoesService {
  constructor(
    @InjectRepository(Notificacoe)
    private notificacaoRepository: Repository<Notificacoe>,
  ) {}

  async create(req: Request, createNotificacoeDto: CreateNotificacoeDto) {
    const newNotificacao: Notificacoe =
      this.notificacaoRepository.create(createNotificacoeDto);

    const notificacao = await this.notificacaoRepository.save(newNotificacao);
    return await this.findOne(req, notificacao.uuid);
  }

  findAll() {
    return `This action returns all notificacoes`;
  }

  async findOne(req: Request, uuid: UUID) {
    return await this.notificacaoRepository.findOneBy({ uuid });
  }

  update(id: number, updateNotificacoeDto: UpdateNotificacoeDto) {
    return `This action updates a #${id} notificacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacoe`;
  }
}
