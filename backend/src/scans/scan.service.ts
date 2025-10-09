import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scan } from 'src/entity/scan_entity';
import { Repository } from 'typeorm';
import { createScanDto } from './dto/create-scan.dto';

@Injectable()
export class ScanService {
  constructor(
    @InjectRepository(Scan) private scanRepository: Repository<Scan>,
  ) {}

  async createScan(dto: createScanDto) {
    const scan = this.scanRepository.create(dto);
    await this.scanRepository.save(scan);
    return scan;
  }

  async getAllScans(user: string) {
    const results = await this.scanRepository.find({
      where: {
        user: user,
      },
    });
    return results;
    // return await this.scanRepository.find({});
  }

  async getScanById(id: number, user: string) {
    const result = await this.scanRepository.findOne({
      where: {
        id:id,
        user: user },
    });
    return result;
  }
  async deleteScan(id: number) {
    const result = await this.scanRepository.delete(id);
    return result;
  }
}
//is AD, scan
