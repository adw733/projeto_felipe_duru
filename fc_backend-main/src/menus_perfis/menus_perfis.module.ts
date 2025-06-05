import { Module } from '@nestjs/common';
import { MenusPerfisService } from './menus_perfis.service';
import { MenusPerfisController } from './menus_perfis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusPerfi } from './entities/menus_perfi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenusPerfi])],
  controllers: [MenusPerfisController],
  providers: [MenusPerfisService]
})
export class MenusPerfisModule {}
