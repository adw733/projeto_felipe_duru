import { Module } from '@nestjs/common';
import { CotacoesRespostasService } from './cotacoes_respostas.service';
import { CotacoesRespostasController } from './cotacoes_respostas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CotacoesResposta } from './entities/cotacoes_resposta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CotacoesResposta])],
  controllers: [CotacoesRespostasController],
  providers: [CotacoesRespostasService], 
  exports: [CotacoesRespostasService]
})
export class CotacoesRespostasModule {}
