import { Injectable } from '@nestjs/common';
import { CreatePessoasEmpresaDto } from './dto/create-pessoas_empresa.dto';
import { UpdatePessoasEmpresaDto } from './dto/update-pessoas_empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoasEmpresa } from './entities/pessoas_empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasEmpresasService {
  constructor(
    @InjectRepository(PessoasEmpresa)
    private pessoasEmpresaRepository: Repository<PessoasEmpresa>,
  ) {}

  create(createPessoasEmpresaDto: CreatePessoasEmpresaDto) {
    return 'This action adds a new pessoasEmpresa';
  }

  findAll() {
    return `This action returns all pessoasEmpresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoasEmpresa`;
  }

  async findOneByColaborador(id: number) {
    const empresa = await this.pessoasEmpresaRepository.findOne({      
      where: {
        pessoaId: id
      },
    });

    return empresa
  }

  update(id: number, updatePessoasEmpresaDto: UpdatePessoasEmpresaDto) {
    return `This action updates a #${id} pessoasEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoasEmpresa`;
  }
}
