import { Injectable } from '@nestjs/common';
import { CreateCotacoesRespostasParcelaDto } from './dto/create-cotacoes_respostas_parcela.dto';
import { UpdateCotacoesRespostasParcelaDto } from './dto/update-cotacoes_respostas_parcela.dto';

@Injectable()
export class CotacoesRespostasParcelasService {
  create(createCotacoesRespostasParcelaDto: CreateCotacoesRespostasParcelaDto) {
    return 'This action adds a new cotacoesRespostasParcela';
  }

  findAll() {
    return `This action returns all cotacoesRespostasParcelas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cotacoesRespostasParcela`;
  }

  update(id: number, updateCotacoesRespostasParcelaDto: UpdateCotacoesRespostasParcelaDto) {
    return `This action updates a #${id} cotacoesRespostasParcela`;
  }

  remove(id: number) {
    return `This action removes a #${id} cotacoesRespostasParcela`;
  }
}
