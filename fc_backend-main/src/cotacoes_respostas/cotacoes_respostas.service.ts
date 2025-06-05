import { Injectable } from '@nestjs/common';
import { CreateCotacoesRespostaDto } from './dto/create-cotacoes_resposta.dto';
import { UpdateCotacoesRespostaDto } from './dto/update-cotacoes_resposta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CotacoesResposta } from './entities/cotacoes_resposta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CotacoesRespostasService {
  constructor(
    @InjectRepository(CotacoesResposta)
    private cotacaoRespostaRepository: Repository<CotacoesResposta>,
  ) {}

  async getByCotacao(cotacaoId: number, isCompras: boolean, empresaId: number) {
    const whereResposta = isCompras
    ? {}
    : {
          fornecedorId: empresaId,
      };


    const cotacoesItens = this.cotacaoRespostaRepository.find({
      relations: {
        fornecedor: true,
        vendedor: true,
        cotacoesRespostasParcelas: true
      },
      where: {
        cotacaoId,
        ...whereResposta
      },
    });

    return cotacoesItens;
  }

  async create(createCotacoesRespostaDto: Array<CotacoesResposta>) {
    const newCotacaoResposta: Array<CotacoesResposta> = this.cotacaoRespostaRepository.create(createCotacoesRespostaDto);

    await this.cotacaoRespostaRepository.save(newCotacaoResposta);
  }

  findAll() {
    return `This action returns all cotacoesRespostas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cotacoesResposta`;
  }

  update(id: number, updateCotacoesRespostaDto: UpdateCotacoesRespostaDto) {
    return `This action updates a #${id} cotacoesResposta`;
  }

  remove(id: number) {
    return `This action removes a #${id} cotacoesResposta`;
  }
}
