import { ArrayNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MembersDto {
  @ApiProperty({
    example: '[662f8170ba38740fe5b598ca]',
    description: 'A list of member IDs to add to the task',
    isArray: true,
  })
  @IsString({ each: true })
  @ArrayNotEmpty()
  readonly memberIds: string[];
}
