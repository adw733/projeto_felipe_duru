import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PessoasEmailsModule } from '../../src/pessoas_emails/pessoas_emails.module';
import { PessoasSenhasModule } from '../../src/pessoas_senhas/pessoas_senhas.module';
import { jwtConstants } from './constants';
import { PessoasModule } from '../../src/pessoas/pessoas.module';
import { PessoasEmpresasModule } from '../pessoas_empresas/pessoas_empresas.module';

@Module({
  imports: [PessoasEmailsModule, PessoasSenhasModule, PessoasEmpresasModule, PessoasModule, PassportModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    // signOptions: { expiresIn: '60s' },
  })], 
  providers: [AuthService], 
  controllers: [AuthController]
})
export class AuthModule {}
