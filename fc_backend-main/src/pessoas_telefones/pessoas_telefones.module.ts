import { Module } from '@nestjs/common';
import { PessoasTelefonesService } from './pessoas_telefones.service';
import { PessoasTelefonesController } from './pessoas_telefones.controller';

@Module({
  controllers: [PessoasTelefonesController],
  providers: [PessoasTelefonesService]
})
export class PessoasTelefonesModule {}
