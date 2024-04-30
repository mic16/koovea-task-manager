import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/modules/task/schemas/task.schema';
import { Types } from 'mongoose';

export class TaskDto {
  constructor(task: Task) {
    this.id = task._id;
    this.title = task.title;
    this.description = task.description || null;
    this.owner = task.owner;
    this.memberIds = task.members;
  }

  @ApiProperty({
    example: '16630b34cd5b317eb513f8163',
    description: 'Task ID',
  })
  @IsString()
  readonly id: Types.ObjectId;

  @ApiProperty({
    example: 'A new task title',
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

  @ApiProperty({
    example: '662f8170ba38740fe5b598ca',
    description: 'The task owner',
  })
  @IsString()
  readonly owner: Types.ObjectId;

  @ApiProperty({
    example: '[662f8170ba38740fe5b598ca]',
    description: 'A list of member IDs that belong to the task',
    isArray: true,
  })
  @IsString({ each: true })
  readonly memberIds: Types.ObjectId[];
}
