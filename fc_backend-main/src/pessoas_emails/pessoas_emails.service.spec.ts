import { Test, TestingModule } from '@nestjs/testing';
import { PessoasEmailsService } from './pessoas_emails.service';

describe('PessoasEmailsService', () => {
  let service: PessoasEmailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasEmailsService],
    }).compile();

    service = module.get<PessoasEmailsService>(PessoasEmailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
