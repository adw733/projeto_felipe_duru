import { Module } from '@nestjs/common';
import { AnexosService } from './anexos.service';
import { AnexosController } from './anexos.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anexo } from './entities/anexo.entity';
import { CommonModule } from '../common/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Anexo]),
    CommonModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AnexosController],
  providers: [AnexosService], 
  exports: [AnexosService]
})
export class AnexosModule {}
