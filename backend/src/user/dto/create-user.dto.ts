import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty({ example: 'test', description: 'User login' })
  readonly login: string;
}
