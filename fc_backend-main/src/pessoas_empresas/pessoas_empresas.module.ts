import { Module } from '@nestjs/common';
import { PessoasEmpresasService } from './pessoas_empresas.service';
import { PessoasEmpresasController } from './pessoas_empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasEmpresa } from './entities/pessoas_empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PessoasEmpresa])],
  controllers: [PessoasEmpresasController],
  providers: [PessoasEmpresasService],
  exports: [PessoasEmpresasService]
})
export class PessoasEmpresasModule {}
