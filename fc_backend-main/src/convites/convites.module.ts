import { Module } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { ConvitesController } from './convites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convite } from './entities/convite.entity';
import { CommonModule } from '../common/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Convite]), CommonModule],
  controllers: [ConvitesController],
  providers: [ConvitesService]
})
export class ConvitesModule {}
