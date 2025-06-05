import { Injectable } from '@nestjs/common';
import { CreatePessoasSiteDto } from './dto/create-pessoas_site.dto';
import { UpdatePessoasSiteDto } from './dto/update-pessoas_site.dto';

@Injectable()
export class PessoasSitesService {
  create(createPessoasSiteDto: CreatePessoasSiteDto) {
    return 'This action adds a new pessoasSite';
  }

  findAll() {
    return `This action returns all pessoasSites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoasSite`;
  }

  update(id: number, updatePessoasSiteDto: UpdatePessoasSiteDto) {
    return `This action updates a #${id} pessoasSite`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoasSite`;
  }
}
