import { Module } from '@nestjs/common';
import { CotacoesItensService } from './cotacoes_itens.service';
import { CotacoesItensController } from './cotacoes_itens.controller';
import { CotacoesIten } from './entities/cotacoes_iten.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CotacoesItensRespostasModule } from '../cotacoes_itens_respostas/cotacoes_itens_respostas.module';

@Module({
  imports: [TypeOrmModule.forFeature([CotacoesIten]), CotacoesItensRespostasModule],
  controllers: [CotacoesItensController],
  providers: [CotacoesItensService], 
  exports: [CotacoesItensService]
})
export class CotacoesItensModule {}
