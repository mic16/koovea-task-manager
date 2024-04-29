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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdFromJWT } from 'src/commons/decorators/id-from-jwt.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { MembersDto } from 'src/modules/task/dtos/members.dto';
import { CreateTaskDto } from 'src/modules/task/dtos/create-task.dto';
import { UpdateTaskDto } from 'src/modules/task/dtos/update-task.dto';
import { TaskService } from 'src/modules/task/services/task.service';

@Controller('task')
@ApiTags('task')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ description: 'Create a new task' })
  @Post('create')
  async createTask(@Body() dto: CreateTaskDto, @IdFromJWT() userId: string) {
    return this.taskService.createTask(dto, userId);
  }

  @ApiOperation({ description: 'Get a task' })
  @Get(':id')
  async getTask(@IdFromJWT() userId: string, @Param('id') taskId: string) {
    return this.taskService.getTask(userId, taskId);
  }

  @ApiOperation({ description: 'Update a task' })
  @Put(':id')
  async updateTask(
    @Body() dto: UpdateTaskDto,
    @IdFromJWT() userId: string,
    @Param('id') taskId: string,
  ) {
    return this.taskService.updateTask(dto, userId, taskId);
  }

  @ApiOperation({ description: 'Delete a task' })
  @Delete(':id')
  async deleteTask(@IdFromJWT() userId: string, @Param('id') taskId: string) {
    return this.taskService.deleteTask(userId, taskId);
  }

  @ApiOperation({ description: 'Add members to a task' })
  @Post('add-members/:id')
  async addMembers(
    @Body() dto: MembersDto,
    @IdFromJWT() userId: string,
    @Param('id') taskId: string,
  ) {
    return this.taskService.addMembers(dto, userId, taskId);
  }

  @ApiOperation({ description: 'Remove members from a task' })
  @Delete('remove-members/:id')
  async removeMembers(
    @Body() dto: MembersDto,
    @IdFromJWT() userId: string,
    @Param('id') taskId: string,
  ) {
    return this.taskService.removeMembers(dto, userId, taskId);
  }
}
