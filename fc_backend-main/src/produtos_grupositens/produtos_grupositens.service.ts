import { Injectable } from '@nestjs/common';
import { CreateProdutosGrupositenDto } from './dto/create-produtos_grupositen.dto';
import { UpdateProdutosGrupositenDto } from './dto/update-produtos_grupositen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutosGrupositen } from './entities/produtos_grupositen.entity';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common/common.service';
import { Produto } from '../produtos/entities/produto.entity';
import { GruposIten } from '../grupos_itens/entities/grupos_iten.entity';

@Injectable()
export class ProdutosGrupositensService {
  constructor(
    @InjectRepository(ProdutosGrupositen) private produtoGrupoitemRepository: Repository<ProdutosGrupositen>,
    private readonly commonService: CommonService,
  ) {}

  async create(createProdutosGrupositenDto: CreateProdutosGrupositenDto[]) {
    const newProdutosGrupositens: ProdutosGrupositen[] = this.produtoGrupoitemRepository.create(createProdutosGrupositenDto);

    return await this.produtoGrupoitemRepository.save(newProdutosGrupositens);
  }

  findAll() {
    return `This action returns all produtosGrupositens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produtosGrupositen`;
  }

  async update(produtoId: number, updateProdutosGrupositenDto: UpdateProdutosGrupositenDto[]) {
    // console.log(updateProdutosGrupositenDto)
    const produtosGrupositens = await this.produtoGrupoitemRepository.find(
      {
        where: {
          produtoId
        }
      }
    );
    
    await this.produtoGrupoitemRepository.save({ ...produtosGrupositens, ...updateProdutosGrupositenDto });
  }

  remove(id: number) {
    return `This action removes a #${id} produtosGrupositen`;
  }
}
