import { Module } from '@nestjs/common';
import { PessoasGruposItensService } from './pessoas_grupos-itens.service';
import { PessoasGruposItensController } from './pessoas_grupos-itens.controller';

@Module({
  controllers: [PessoasGruposItensController],
  providers: [PessoasGruposItensService]
})
export class PessoasGruposItensModule {}
