import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDto {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
  @ApiProperty({ example: '<token>', description: 'JWT token' })
  @IsString()
  readonly accessToken: string;
}
