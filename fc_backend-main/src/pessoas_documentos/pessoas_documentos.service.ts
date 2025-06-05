import { Injectable } from '@nestjs/common';
import { CreatePessoasDocumentoDto } from './dto/create-pessoas_documento.dto';
import { UpdatePessoasDocumentoDto } from './dto/update-pessoas_documento.dto';

@Injectable()
export class PessoasDocumentosService {
  create(createPessoasDocumentoDto: CreatePessoasDocumentoDto) {
    return 'This action adds a new pessoasDocumento';
  }

  findAll() {
    return `This action returns all pessoasDocumentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoasDocumento`;
  }

  update(id: number, updatePessoasDocumentoDto: UpdatePessoasDocumentoDto) {
    return `This action updates a #${id} pessoasDocumento`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoasDocumento`;
  }
}
