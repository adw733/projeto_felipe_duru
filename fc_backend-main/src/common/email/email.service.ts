import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(createEmailDto: CreateEmailDto) {
    if (!createEmailDto.to) {
      createEmailDto.to = 'Contato PF <contato@portalfecom.com.br>';
    }

    await this.mailerService.sendMail({
      from: 'portalFecom <administrador@portalfecom.com.br>',
      to: createEmailDto.to,
      subject: createEmailDto.subject,
      template: `./${createEmailDto.origin}`,
      context: createEmailDto.context,
    });

    return `registramos a sua ${createEmailDto.subject}
Retornaremos em breve.`;
  }
}
