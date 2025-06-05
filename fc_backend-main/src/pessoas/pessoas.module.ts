import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { CommonModule } from '../common/common/common.module';
import { TiposItensModule } from '../tipos_itens/tipos_itens.module';
import { AnexosModule } from '../anexos/anexos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa]), CommonModule, TiposItensModule, AnexosModule],
  controllers: [PessoasController],
  providers: [PessoasService], 
  exports: [PessoasService]
})
export class PessoasModule {}
