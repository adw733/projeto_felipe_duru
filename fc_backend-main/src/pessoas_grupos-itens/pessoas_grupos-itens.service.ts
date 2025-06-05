import { Injectable } from '@nestjs/common';
import { CreatePessoasGruposItenDto } from './dto/create-pessoas_grupos-iten.dto';
import { UpdatePessoasGruposItenDto } from './dto/update-pessoas_grupos-iten.dto';

@Injectable()
export class PessoasGruposItensService {
  create(createPessoasGruposItenDto: CreatePessoasGruposItenDto) {
    return 'This action adds a new pessoasGruposIten';
  }

  findAll() {
    return `This action returns all pessoasGruposItens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoasGruposIten`;
  }

  update(id: number, updatePessoasGruposItenDto: UpdatePessoasGruposItenDto) {
    return `This action updates a #${id} pessoasGruposIten`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoasGruposIten`;
  }
}
