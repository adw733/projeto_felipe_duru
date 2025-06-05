import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { UUID } from 'crypto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu) private menusRepository: Repository<Menu>,
  ) {}

  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  findAll() {
    return this.menusRepository.find({      
      where: {
        status: {
          nome: 'Ativo',
        },
        deletedAt: null,
      },
      withDeleted: false,
      order: {
        ordem: 'ASC',
      },
    });
  }
  findOneById(id: number) {
    return this.menusRepository.findOneOrFail({      
      where: {
        id,
      },
      withDeleted: false
    });
  }

  findOneByUUID(uuid: UUID) {
    return this.menusRepository.findOneOrFail({      
      where: {
        uuid,
      },
      withDeleted: false
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
