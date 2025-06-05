import { Injectable } from '@nestjs/common';
import { CreatePessoasEnderecoDto } from './dto/create-pessoas_endereco.dto';
import { UpdatePessoasEnderecoDto } from './dto/update-pessoas_endereco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoasEndereco } from './entities/pessoas_endereco.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasEnderecosService {
  constructor(
    @InjectRepository(PessoasEndereco)
    private pessoaEnderecoRepository: Repository<PessoasEndereco>,
  ) {}

  async findOne(pessoaId: number) {
    return await this.pessoaEnderecoRepository.findOneOrFail({
      relations: { estados: true },
      where: { pessoaId },
    });
  }
}
