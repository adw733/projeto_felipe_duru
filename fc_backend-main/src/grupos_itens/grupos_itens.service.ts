import { Injectable } from '@nestjs/common';
import { CreateGruposItenDto } from './dto/create-grupos_iten.dto';
import { UpdateGruposItenDto } from './dto/update-grupos_iten.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GruposIten } from './entities/grupos_iten.entity';
import { UUID } from 'crypto';

@Injectable()
export class GruposItensService {
  constructor(
    @InjectRepository(GruposIten)
    private gruposItensRepository: Repository<GruposIten>,
  ) {}

  create(createGruposItenDto: CreateGruposItenDto) {
    return 'This action adds a new gruposIten';
  }

  findAll() {
    return this.gruposItensRepository.find({
      where: {
        status: {
          nome: 'Ativo',
        },
      },
      withDeleted: false,
    });
  }

  findOneById(id: number) {
    return this.gruposItensRepository.findOneOrFail({
      where: {
        id,
      },
      withDeleted: false,
    });
  }

  findOneByUUID(uuid: UUID) {
    return this.gruposItensRepository.findOneOrFail({
      where: {
        uuid,
      },
      withDeleted: false,
    });
  }

  async findAutocomplete(search: string, tipoId: number) {
    const where =
      tipoId > 0
        ? { statusId: 2, tipoId: tipoId, search: `%${search}%` }
        : { statusId: 2, search: `%${search}%` };

    return await this.gruposItensRepository
      .createQueryBuilder('grupos_itens')
      .innerJoin('grupos_itens.grupos', 'grupos')
      .where(
        `grupos_itens.status_id = :statusId ${
          tipoId > 0 ? 'AND grupos.tipo_id = :tipoId' : ''
        } AND unaccent(grupos_itens.nome) ILIKE unaccent(:search)`,
        where,
      )
      .select([
        'DISTINCT (grupos_itens.id) AS value',
        'grupos_itens.nome AS text',
        'grupos.nomeAlternativo as group',
      ])
      .limit(10)
      .getRawMany();
  }

  update(id: number, updateGruposItenDto: UpdateGruposItenDto) {
    return `This action updates a #${id} gruposIten`;
  }

  remove(id: number) {
    return `This action removes a #${id} gruposIten`;
  }
}
