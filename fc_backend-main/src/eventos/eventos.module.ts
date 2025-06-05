import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Evento } from './entities/evento.entity';
import { CommonModule } from '../common/common/common.module';
import { AnexosModule } from '../anexos/anexos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Evento]), CommonModule, AnexosModule],
  controllers: [EventosController],
  providers: [EventosService]
})
export class EventosModule {}
