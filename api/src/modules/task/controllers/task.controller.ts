import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdFromJWT } from 'src/commons/decorators/id-from-jwt.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { MembersDto } from 'src/modules/task/dtos/members.dto';
import { CreateTaskDto } from 'src/modules/task/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/modules/task/dtos/update-task.dto';
import { TaskService } from 'src/modules/task/services/task.service';
import { TaskDto } from 'src/modules/task/dtos/task.dto';

@Controller('task')
@ApiTags('task')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ description: 'Create a new task' })
  @ApiResponse({ type: TaskDto })
  @Post('create')
  async createTask(@Body() dto: CreateTaskDto, @IdFromJWT() userId: string): Promise<TaskDto> {
    const task = await this.taskService.createTask(dto, userId);
    return new TaskDto(task);
  }

  @ApiOperation({ description: 'Get a task' })
  @ApiResponse({ type: TaskDto })
  @Get(':id')
  async getTask(@IdFromJWT() userId: string, @Param('id') taskId: string): Promise<TaskDto> {
    const task = await this.taskService.getTask(userId, taskId);
    return new TaskDto(task);
  }

  @ApiOperation({ description: 'Update a task' })
  @ApiResponse({ type: TaskDto })
  @Put(':id')
  async updateTask(
    @Body() dto: UpdateTaskDto,
    @IdFromJWT() userId: string,
    @Param('id') taskId: string,
  ): Promise<TaskDto> {
    const task = await this.taskService.updateTask(dto, userId, taskId);
    return new TaskDto(task);
  }

  @ApiOperation({ description: 'Delete a task' })
  @Delete(':id')
  async deleteTask(@IdFromJWT() userId: string, @Param('id') taskId: string): Promise<void> {
    return this.taskService.deleteTask(userId, taskId);
  }

  @ApiOperation({ description: 'Add members to a task' })
  @ApiResponse({ type: TaskDto })
  @Post('add-members/:id')
  async addMembers(
    @Body() dto: MembersDto,
    @IdFromJWT() userId: string,
    @Param('id') taskId: string,
  ): Promise<TaskDto> {
    const task = await this.taskService.addMembers(dto, userId, taskId);
    return new TaskDto(task);
  }

  @ApiOperation({ description: 'Remove members from a task' })
  @ApiResponse({ type: TaskDto })
  @Delete('remove-members/:id')
  async removeMembers(
    @Body() dto: MembersDto,
    @IdFromJWT() userId: string,
    @Param('id') taskId: string,
  ): Promise<TaskDto> {
    const task = await this.taskService.removeMembers(dto, userId, taskId);
    return new TaskDto(task);
  }
}
