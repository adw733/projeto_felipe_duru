import { Test, TestingModule } from '@nestjs/testing';
import { MenusPerfisController } from './menus_perfis.controller';
import { MenusPerfisService } from './menus_perfis.service';

describe('MenusPerfisController', () => {
  let controller: MenusPerfisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenusPerfisController],
      providers: [MenusPerfisService],
    }).compile();

    controller = module.get<MenusPerfisController>(MenusPerfisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
