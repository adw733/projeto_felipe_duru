import { Module } from '@nestjs/common';
import { PessoasSitesService } from './pessoas_sites.service';
import { PessoasSitesController } from './pessoas_sites.controller';

@Module({
  controllers: [PessoasSitesController],
  providers: [PessoasSitesService]
})
export class PessoasSitesModule {}
