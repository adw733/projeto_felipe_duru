import { Module } from '@nestjs/common';
import { GruposItensService } from './grupos_itens.service';
import { GruposItensController } from './grupos_itens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposIten } from './entities/grupos_iten.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GruposIten])],
  controllers: [GruposItensController],
  providers: [GruposItensService]
})
export class GruposItensModule {}
