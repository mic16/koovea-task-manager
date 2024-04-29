import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'John',
    description: 'User name',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'D5N8#vLEm%*r2g4URB',
    description: 'User account password',
  })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
