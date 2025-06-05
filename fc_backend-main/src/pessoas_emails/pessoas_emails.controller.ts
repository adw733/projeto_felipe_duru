import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasEmailsService } from './pessoas_emails.service';
import { CreatePessoasEmailDto } from './dto/create-pessoas_email.dto';
import { UpdatePessoasEmailDto } from './dto/update-pessoas_email.dto';

@Controller('pessoas-emails')
export class PessoasEmailsController {
  constructor(private readonly pessoasEmailsService: PessoasEmailsService) {}

  @Post()
  create(@Body() createPessoasEmailDto: CreatePessoasEmailDto) {
    return this.pessoasEmailsService.create(createPessoasEmailDto);
  }

  @Get()
  findAll() {
    return this.pessoasEmailsService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.pessoasEmailsService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoasEmailDto: UpdatePessoasEmailDto) {
    return this.pessoasEmailsService.update(+id, updatePessoasEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasEmailsService.remove(+id);
  }
}
