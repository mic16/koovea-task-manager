import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Update a new project',
    description: 'Task title',
  })
  @IsString()
  @IsOptional()
  readonly title: string | null;

  @ApiProperty({
    example: 'Update a new project for the company',
    description: 'Task description',
  })
  @IsString()
  @IsOptional()
  readonly description: string | null;
}
