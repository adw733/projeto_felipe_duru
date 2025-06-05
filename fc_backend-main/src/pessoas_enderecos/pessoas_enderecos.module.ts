import { Module } from '@nestjs/common';
import { PessoasEnderecosService } from './pessoas_enderecos.service';
import { PessoasEnderecosController } from './pessoas_enderecos.controller';
import { PessoasEndereco } from './entities/pessoas_endereco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PessoasEndereco])],
  controllers: [PessoasEnderecosController],
  providers: [PessoasEnderecosService], 
  exports: [PessoasEnderecosService]
})
export class PessoasEnderecosModule {}
