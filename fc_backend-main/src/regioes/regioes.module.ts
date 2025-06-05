import { Module } from '@nestjs/common';
import { RegioesService } from './regioes.service';
import { RegioesController } from './regioes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regioe } from './entities/regioe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Regioe])],
  controllers: [RegioesController],
  providers: [RegioesService]
})
export class RegioesModule {}
