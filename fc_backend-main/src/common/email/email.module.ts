import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAILHOST,
        port: process.env.EMAILPORT,
        secure: process.env.EMAILSECURE,
        auth: {
          user: process.env.EMAILUSER,
          pass: process.env.EMAILPASSWORD
        },
      }, 
      defaults: {
        from: '"'
      }, 
      template: {
        dir: join(__dirname, '..', '..', '..', 'templates'),        
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }, 
      options: {
        partials: {
          dir: join(__dirname, '..', '..', '..', 'templates/partials'),
          options: {
            strict: true
          }
        },
        layouts: {
          dir: join(__dirname, '..', '..', '..', 'templates/layouts'),
          options: {
            strict: true
          }
        },
      }
    })
  ],
  controllers: [EmailController],
  providers: [EmailService], 
  exports: [EmailService]
})

export class EmailModule {}
