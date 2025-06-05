import { Injectable } from '@nestjs/common';
import { CreatePessoasPerfiDto } from './dto/create-pessoas_perfi.dto';
import { UpdatePessoasPerfiDto } from './dto/update-pessoas_perfi.dto';

@Injectable()
export class PessoasPerfisService {
  create(createPessoasPerfiDto: CreatePessoasPerfiDto) {
    return 'This action adds a new pessoasPerfi';
  }

  findAll() {
    return `This action returns all pessoasPerfis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoasPerfi`;
  }

  update(id: number, updatePessoasPerfiDto: UpdatePessoasPerfiDto) {
    return `This action updates a #${id} pessoasPerfi`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoasPerfi`;
  }
}
