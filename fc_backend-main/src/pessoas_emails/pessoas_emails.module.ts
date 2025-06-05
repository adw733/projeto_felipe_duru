import { Module } from '@nestjs/common';
import { PessoasEmailsService } from './pessoas_emails.service';
import { PessoasEmailsController } from './pessoas_emails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasEmail } from './entities/pessoas_email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PessoasEmail])],
  controllers: [PessoasEmailsController],
  providers: [PessoasEmailsService], 
  exports: [PessoasEmailsService]
})
export class PessoasEmailsModule {}
