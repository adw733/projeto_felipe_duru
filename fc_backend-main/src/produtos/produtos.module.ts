import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { CommonModule } from '../common/common/common.module';
import { Produto } from './entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosGrupositensModule } from '../produtos_grupositens/produtos_grupositens.module';
import { AnexosModule } from '../anexos/anexos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CommonModule, ProdutosGrupositensModule, AnexosModule],
  controllers: [ProdutosController],
  providers: [ProdutosService]
})
export class ProdutosModule {}
