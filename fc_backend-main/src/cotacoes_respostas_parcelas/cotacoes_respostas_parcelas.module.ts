import { Module } from '@nestjs/common';
import { CotacoesRespostasParcelasService } from './cotacoes_respostas_parcelas.service';
import { CotacoesRespostasParcelasController } from './cotacoes_respostas_parcelas.controller';

@Module({
  controllers: [CotacoesRespostasParcelasController],
  providers: [CotacoesRespostasParcelasService]
})
export class CotacoesRespostasParcelasModule {}
