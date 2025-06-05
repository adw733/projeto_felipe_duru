import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PessoasService } from '../../src/pessoas/pessoas.service';
import { PessoasEmailsService } from '../../src/pessoas_emails/pessoas_emails.service';
import { PessoasSenhasService } from '../../src/pessoas_senhas/pessoas_senhas.service';
import { PessoasEmpresasService } from '../../src/pessoas_empresas/pessoas_empresas.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private pessoaService: PessoasService,
    private pessoaEmailService: PessoasEmailsService,
    private pessoaSenhaService: PessoasSenhasService,
    private PessoasEmpresasService: PessoasEmpresasService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, senha: string): Promise<any> {
    try {
      const getPessoaEmail = await this.pessoaEmailService.findOne(email);

      
      if (getPessoaEmail.id) {
        const getPessoaSenha = await this.pessoaSenhaService.findOneByPessoa(getPessoaEmail.pessoaId)
        if(getPessoaSenha.id) {
          const isSenhaCorreta = await compare(senha, getPessoaSenha.senha)
          if(!isSenhaCorreta) {
            throw new Error('Senha incorreta');
          }
        } else {
          throw new Error('Usuário não tem senha');
        }

        // const empresa = await this.PessoasEmpresasService.findOneByColaborador(getPessoaEmail.pessoaId)

        const pessoa = await this.pessoaService.findOnePerfil(getPessoaEmail.pessoaId);
        
        const payload = {
          id: pessoa.pessoa.id,
          uuid: pessoa.pessoa.uuid,
          empresaId: pessoa?.empresa?.id || pessoa.pessoa.id
        };
        return {
          pessoa,
          access_token: await this.jwtService.signAsync(payload),
        };
      }
      throw new Error('E-mail não encontrado');
    } catch (err) {
      throw new UnauthorizedException('E-mail e/ou senha inválidos', { description: err.message });
    }
  }
}
