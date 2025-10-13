import { ApiProperty } from '@nestjs/swagger';

export class createScanDto {
  @ApiProperty({ example: 'scan', description: 'User login' })
  readonly user: string;

  @ApiProperty({ example: true, description: 'Is AntiDetect browser' })
  readonly isAD: boolean;

  @ApiProperty({ example: 'This is a comment', description: 'Scan comment' })
  readonly comment: string;
}
