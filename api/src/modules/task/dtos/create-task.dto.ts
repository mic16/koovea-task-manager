import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Create a new project',
    description: 'Task title',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Create a new project for the company',
    description: 'Task description',
  })
  @IsString()
  @IsOptional()
  readonly description: string | null;
}
