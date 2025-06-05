import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasEnderecosService } from './pessoas_enderecos.service';
import { CreatePessoasEnderecoDto } from './dto/create-pessoas_endereco.dto';
import { UpdatePessoasEnderecoDto } from './dto/update-pessoas_endereco.dto';

@Controller('pessoas-enderecos')
export class PessoasEnderecosController {
  constructor(private readonly pessoasEnderecosService: PessoasEnderecosService) {}

}
