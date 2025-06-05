import { Module } from '@nestjs/common';
import { CotacoesItensRespostasService } from './cotacoes_itens_respostas.service';
import { CotacoesItensRespostasController } from './cotacoes_itens_respostas.controller';
import { CotacoesItensResposta } from './entities/cotacoes_itens_resposta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CotacoesItensResposta])],
  controllers: [CotacoesItensRespostasController],
  providers: [CotacoesItensRespostasService], 
  exports: [CotacoesItensRespostasService]
})
export class CotacoesItensRespostasModule {}
