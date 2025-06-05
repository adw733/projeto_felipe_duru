import { Injectable } from '@nestjs/common';
import { CreateCotacoesItensRespostaDto } from './dto/create-cotacoes_itens_resposta.dto';
import { UpdateCotacoesItensRespostaDto } from './dto/update-cotacoes_itens_resposta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CotacoesItensResposta } from './entities/cotacoes_itens_resposta.entity';
import { Repository } from 'typeorm';
import { CotacoesIten } from '../cotacoes_itens/entities/cotacoes_iten.entity';
import { UUID } from 'crypto';
import { UpdateCotacoeDto } from '../cotacoes/dto/update-cotacoe.dto';

@Injectable()
export class CotacoesItensRespostasService {
  constructor(
    @InjectRepository(CotacoesItensResposta)
    private cotacaoItemRespostaRepository: Repository<CotacoesItensResposta>,
  ) {}

  async getByCotacaoItem(
    cotacaoItemId: number,
    isCompras: boolean,
    empresaId: number,
  ) {
    const whereResposta = isCompras
      ? {}
      : {
          fornecedorId: empresaId,
        };

    const cotacoesItemResposta = await this.cotacaoItemRespostaRepository.find({
      relations: {
        fornecedor: true,
        vendedor: true,
      },
      where: {
        itemId: cotacaoItemId,
        ...whereResposta,
      },
    });

    return cotacoesItemResposta;
  }

  async create(req: Request, createCotacoeDto: CreateCotacoesItensRespostaDto) {
    const empresaId = req['user'].empresaId;

    const newCotacaoItemResposta: CotacoesItensResposta =
      this.cotacaoItemRespostaRepository.create(createCotacoeDto);

    const cotacaoItemResposta = await this.cotacaoItemRespostaRepository.save(
      newCotacaoItemResposta,
    );
    return await this.getByCotacaoItem(
      cotacaoItemResposta.itemId,
      false,
      empresaId,
    );
  }

  async update(req: Request, updateCotacoeDto: CreateCotacoesItensRespostaDto) {
    const empresaId = req['user'].empresaId;

    const newCotacaoItemResposta: CotacoesItensResposta =
      this.cotacaoItemRespostaRepository.create(updateCotacoeDto);
    await this.cotacaoItemRespostaRepository.save(newCotacaoItemResposta);

    return await this.getByCotacaoItem(
      updateCotacoeDto.itemId,
      false,
      empresaId,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} cotacoe`;
  }
}
