import { Module } from '@nestjs/common';
import { PessoasPerfisService } from './pessoas_perfis.service';
import { PessoasPerfisController } from './pessoas_perfis.controller';

@Module({
  controllers: [PessoasPerfisController],
  providers: [PessoasPerfisService]
})
export class PessoasPerfisModule {}
