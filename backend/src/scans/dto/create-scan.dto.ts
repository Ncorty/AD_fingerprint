// import { ApiProperty } from '@nestjs/swagger';

export class createScanDto {
  readonly user: string;
  readonly isAD: boolean;
  readonly comment: string;
}
