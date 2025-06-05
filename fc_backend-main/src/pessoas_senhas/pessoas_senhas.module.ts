import { Module } from '@nestjs/common';
import { PessoasSenhasService } from './pessoas_senhas.service';
import { PessoasSenhasController } from './pessoas_senhas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasSenha } from './entities/pessoas_senha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PessoasSenha])],
  controllers: [PessoasSenhasController],
  providers: [PessoasSenhasService],
  exports: [PessoasSenhasService]
})
export class PessoasSenhasModule {}
