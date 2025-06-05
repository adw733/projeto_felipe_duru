import { Injectable } from '@nestjs/common';
import { CreatePessoasSenhaDto } from './dto/create-pessoas_senha.dto';
import { UpdatePessoasSenhaDto } from './dto/update-pessoas_senha.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoasSenha } from './entities/pessoas_senha.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasSenhasService {
  constructor(
    @InjectRepository(PessoasSenha) private pessoasSenhasRepository: Repository<PessoasSenha>
  ) {}

  create(createPessoasSenhaDto: CreatePessoasSenhaDto) {
    return 'This action adds a new pessoasSenha';
  }

  findAll() {
    return `This action returns all pessoasSenhas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoasSenha`;
  }

  findOneByPessoa(id: number) {
    return this.pessoasSenhasRepository.findOne(
      {
        where: {
          pessoasSenhas: {
            id
          }, 
          status: {
            nome: 'Ativo'
          }
        }, 
        withDeleted: false
      }
    );
  }

  update(id: number, updatePessoasSenhaDto: UpdatePessoasSenhaDto) {
    return `This action updates a #${id} pessoasSenha`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoasSenha`;
  }
}
