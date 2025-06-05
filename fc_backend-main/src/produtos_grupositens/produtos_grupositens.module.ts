import { Module } from '@nestjs/common';
import { ProdutosGrupositensService } from './produtos_grupositens.service';
import { ProdutosGrupositensController } from './produtos_grupositens.controller';
import { CommonModule } from '../common/common/common.module';
import { ProdutosGrupositen } from './entities/produtos_grupositen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutosGrupositen]), CommonModule],
  controllers: [ProdutosGrupositensController],
  providers: [ProdutosGrupositensService],
  exports: [ProdutosGrupositensService]
})
export class ProdutosGrupositensModule {}
