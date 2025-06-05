import { Test, TestingModule } from '@nestjs/testing';
import { PessoasEmailsController } from './pessoas_emails.controller';
import { PessoasEmailsService } from './pessoas_emails.service';

describe('PessoasEmailsController', () => {
  let controller: PessoasEmailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasEmailsController],
      providers: [PessoasEmailsService],
    }).compile();

    controller = module.get<PessoasEmailsController>(PessoasEmailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
