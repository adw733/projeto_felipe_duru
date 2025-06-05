import { Test, TestingModule } from '@nestjs/testing';
import { MenusPerfisService } from './menus_perfis.service';

describe('MenusPerfisService', () => {
  let service: MenusPerfisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenusPerfisService],
    }).compile();

    service = module.get<MenusPerfisService>(MenusPerfisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
