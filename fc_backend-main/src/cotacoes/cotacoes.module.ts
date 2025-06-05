import { Module } from '@nestjs/common';
import { CotacoesService } from './cotacoes.service';
import { CotacoesController } from './cotacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotacoe } from './entities/cotacoe.entity';
import { CommonModule } from '../common/common/common.module';
import { TiposItensModule } from '../tipos_itens/tipos_itens.module';
import { PessoasEnderecosModule } from '../pessoas_enderecos/pessoas_enderecos.module';
import { CotacoesItensModule } from '../cotacoes_itens/cotacoes_itens.module';
import { CotacoesRespostasModule } from '../cotacoes_respostas/cotacoes_respostas.module';
import { NotificacoesModule } from 'src/notificacoes/notificacoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cotacoe]),
    CommonModule,
    TiposItensModule,
    PessoasEnderecosModule,
    CotacoesItensModule,
    CotacoesRespostasModule,
    NotificacoesModule,
  ],
  controllers: [CotacoesController],
  providers: [CotacoesService],
})
export class CotacoesModule {}
