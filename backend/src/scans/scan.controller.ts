import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
// import { createUserDto } from './dto/create-user.dto';
import { ScanService } from './scan.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Scan } from 'src/entity/scan_entity';
import { createScanDto } from './dto/create-scan.dto';
import { getScanDto } from './dto/get-scan.dto';

@Controller('scans')
export class ScanController {
  constructor(private scanService: ScanService) {}
  @Post('create')
  create(@Body() userDto: createScanDto) {
    return this.scanService.createScan(userDto);
  }
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [Scan], description: 'List of users' })
  @Get('getAll')
  getAll(@Query() query: getScanDto) {
    return this.scanService.getAllScans(query.user);
  }
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    console.log(id);
    console.log(Number(id));
    return this.scanService.deleteScan(Number(id));
  }
}
