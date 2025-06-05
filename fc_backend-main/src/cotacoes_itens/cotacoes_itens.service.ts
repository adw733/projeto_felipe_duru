import { Injectable } from '@nestjs/common';
import { CreateCotacoesItenDto } from './dto/create-cotacoes_iten.dto';
import { UpdateCotacoesItenDto } from './dto/update-cotacoes_iten.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CotacoesIten } from './entities/cotacoes_iten.entity';
import { Repository } from 'typeorm';
import { CotacoesItensRespostasService } from '../cotacoes_itens_respostas/cotacoes_itens_respostas.service';

@Injectable()
export class CotacoesItensService {
  constructor(
    @InjectRepository(CotacoesIten)
    private cotacaoItemRepository: Repository<CotacoesIten>,
    private cotacaoItemRespostaService: CotacoesItensRespostasService,

  ) {}

  async getByCotacao(cotacaoId: number, isCompras: boolean, empresaId: number) {
    const cotacoesItens = await this.cotacaoItemRepository.find({
      relations: {
        produtos: true
      },
      where: {
        cotacaoId,
      },
    });

    for(const cotacaoItem of cotacoesItens) {
      cotacaoItem.cotacoesItensRespostas = await this.cotacaoItemRespostaService.getByCotacaoItem(cotacaoItem.id, isCompras, empresaId)
    }

    return cotacoesItens;
  }

  create(createCotacoesItenDto: CreateCotacoesItenDto) {
    return 'This action adds a new cotacoesIten';
  }

  findAll() {
    return `This action returns all cotacoesItens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cotacoesIten`;
  }

  async update(req: Request, updateCotacoeDto: CreateCotacoesItenDto) {
    const newCotacaoItemResposta: CotacoesIten =
      this.cotacaoItemRepository.create(updateCotacoeDto);
    await this.cotacaoItemRepository.save(newCotacaoItemResposta);

    return 'alterado'
  }

  remove(id: number) {
    return `This action removes a #${id} cotacoesIten`;
  }
}
