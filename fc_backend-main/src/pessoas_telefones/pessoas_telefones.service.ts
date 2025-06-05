import { Injectable } from '@nestjs/common';
import { CreatePessoasTelefoneDto } from './dto/create-pessoas_telefone.dto';
import { UpdatePessoasTelefoneDto } from './dto/update-pessoas_telefone.dto';

@Injectable()
export class PessoasTelefonesService {
  create(createPessoasTelefoneDto: CreatePessoasTelefoneDto) {
    return 'This action adds a new pessoasTelefone';
  }

  findAll() {
    return `This action returns all pessoasTelefones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoasTelefone`;
  }

  update(id: number, updatePessoasTelefoneDto: UpdatePessoasTelefoneDto) {
    return `This action updates a #${id} pessoasTelefone`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoasTelefone`;
  }
}
