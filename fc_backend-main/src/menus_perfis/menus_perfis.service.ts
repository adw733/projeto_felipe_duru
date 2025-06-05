import { Injectable } from '@nestjs/common';
import { CreateMenusPerfiDto } from './dto/create-menus_perfi.dto';
import { UpdateMenusPerfiDto } from './dto/update-menus_perfi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenusPerfi } from './entities/menus_perfi.entity';
import { UUID } from 'crypto';

@Injectable()
export class MenusPerfisService {
  constructor(
    @InjectRepository(MenusPerfi) private menusPerfisRepository: Repository<MenusPerfi>
  ) {}

  create(createMenusPerfiDto: CreateMenusPerfiDto) {
    return 'This action adds a new menusPerfi';
  }

  findAll() {
    return this.menusPerfisRepository.find({            
      where: {
        status: {
          nome: 'Ativo'
        },
        deletedAt: null,
      },   
      withDeleted: false 
    });
  }

  findOneById(id: number) {
    return this.menusPerfisRepository.findOneOrFail({ 
      select: {
        status: {
          id: true,
          nome: true,
          nomeAlternativo: true,
        },
        menus: {
          id: true, 
          nome: true, 
        }, 
        perfis: {
          id: true, 
          nome: true,
        }
      },
      relations: {
        status: true, 
        menus: true, 
        perfis: true,
      }, 
      where: {
        id
      }
     });
  }

  findOneByUUID(uuid: UUID) {
    return this.menusPerfisRepository.findOneOrFail({ 
      select: {
        status: {
          id: true,
          nome: true,
          nomeAlternativo: true,
        },
        menus: {
          id: true, 
          nome: true, 
        }, 
        perfis: {
          id: true, 
          nome: true,
        }
      },
      relations: {
        status: true, 
        menus: true, 
        perfis: true,
      }, 
      where: {
        uuid
      }
     });
  }

  update(id: number, updateMenusPerfiDto: UpdateMenusPerfiDto) {
    return `This action updates a #${id} menusPerfi`;
  }

  remove(id: number) {
    return `This action removes a #${id} menusPerfi`;
  }
}
