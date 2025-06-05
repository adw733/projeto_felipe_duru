import { Module } from '@nestjs/common';
import { PerfisService } from './perfis.service';
import { PerfisController } from './perfis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfi } from './entities/perfi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfi])],
  controllers: [PerfisController],
  providers: [PerfisService]
})
export class PerfisModule {}
