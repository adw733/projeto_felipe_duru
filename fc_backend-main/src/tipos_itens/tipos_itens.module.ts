import { Module } from '@nestjs/common';
import { TiposItensService } from './tipos_itens.service';
import { TiposItensController } from './tipos_itens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposIten } from './entities/tipos_iten.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TiposIten])],
  controllers: [TiposItensController],
  providers: [TiposItensService],
  exports: [TiposItensService]
})
export class TiposItensModule {}
