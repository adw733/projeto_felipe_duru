import { Module } from '@nestjs/common';
import { ArtigosService } from './artigos.service';
import { ArtigosController } from './artigos.controller';
import { Artigo } from './entities/artigo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common/common.module';
import { AnexosModule } from '../anexos/anexos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artigo]), CommonModule, AnexosModule],
  controllers: [ArtigosController],
  providers: [ArtigosService]
})
export class ArtigosModule {}
