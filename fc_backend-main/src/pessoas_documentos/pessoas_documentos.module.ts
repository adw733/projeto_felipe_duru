import { Module } from '@nestjs/common';
import { PessoasDocumentosService } from './pessoas_documentos.service';
import { PessoasDocumentosController } from './pessoas_documentos.controller';

@Module({
  controllers: [PessoasDocumentosController],
  providers: [PessoasDocumentosService]
})
export class PessoasDocumentosModule {}
