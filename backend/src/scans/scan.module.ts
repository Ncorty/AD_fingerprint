import { Module } from '@nestjs/common';
import { ScanService } from './scan.service';
import { ScanController } from './scan.controller';
// import { User } from 'src/entity/user_entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scan } from '../entity/scan_entity';

@Module({
  providers: [ScanService],
  controllers: [ScanController],
  imports: [TypeOrmModule.forFeature([Scan])],
})
export class ScanModule {}
