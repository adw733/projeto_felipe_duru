import { Injectable } from '@nestjs/common';
import { CreatePessoasEmailDto } from './dto/create-pessoas_email.dto';
import { UpdatePessoasEmailDto } from './dto/update-pessoas_email.dto';
import { PessoasEmail } from './entities/pessoas_email.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PessoasEmailsService {
  constructor(
    @InjectRepository(PessoasEmail) private pessoasEmailsRepository: Repository<PessoasEmail>
  ) {}

  create(createPessoasEmailDto: CreatePessoasEmailDto) {
    return 'This action adds a new pessoasEmail';
  }

  findAll() {
    return `This action returns all pessoasEmails`;
  }

  findOne(email: string) {
    return this.pessoasEmailsRepository.findOne(
      {
        where: {
          email, 
          isAtivo: true, 
        }, 
      }
    );
  }

  update(id: number, updatePessoasEmailDto: UpdatePessoasEmailDto) {
    return `This action updates a #${id} pessoasEmail`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoasEmail`;
  }
}
