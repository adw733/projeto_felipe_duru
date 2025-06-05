import { Module } from '@nestjs/common';
import { StatusModule } from '../../status/status.module';
import { CommonService } from './common.service';

@Module({
    imports: [StatusModule],
    providers: [CommonService],
    exports: [CommonService]
})
export class CommonModule {}
