import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from 'src/modules/task/dtos/create-task.dto';
import { TaskNotFoundException } from 'src/commons/errors/task/task-not-found';
import { User } from 'src/modules/user/schemas/user.schema';
import { UserNotFoundException } from 'src/commons/errors/user/user-not-found';
import { MembersDto } from 'src/modules/task/dtos/members.dto';
import { UserIsNotOwnerException } from 'src/commons/errors/task/user-is-not-owner';
import { UserAlreadyAssignedException } from 'src/commons/errors/task/user-already-assigned';
import { UserUnauthorizedException } from 'src/commons/errors/task/user-unauthorized';
import { UpdateTaskDto } from 'src/modules/task/dtos/update-task.dto';
import { UserNotAssignedException } from 'src/commons/errors/task/user-not-assigned';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createTask(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<Task> {
    const newTask = new this.taskModel({
      title: createTaskDto.title,
      description: createTaskDto.description,
      owner: userId,
      members: [],
    });
    return newTask.save();
  }

  async getTask(userId: string, taskId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }
    if (
      task.owner.toString() !== userId &&
      task.members.some((m) => m.toString() === userId) === false
    ) {
      throw new UserUnauthorizedException();
    }
    return task;
  }

  async updateTask(
    updateTaskDto: UpdateTaskDto,
    userId: string,
    taskId: string,
  ): Promise<Task> {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }
    if (
      task.owner.toString() !== userId &&
      task.members.some((m) => m.toString() === userId) === false
    ) {
      throw new UserUnauthorizedException();
    }
    task.title = updateTaskDto.title || task.title;
    task.description = updateTaskDto.description || task.description;
    return task.save();
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }
    if (task.owner.toString() !== userId) {
      throw new UserUnauthorizedException();
    }
    await task.deleteOne();
  }

  async addMembers(
    membersDto: MembersDto,
    ownerId: string,
    taskId: string,
  ): Promise<Task> {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }
    if (task.owner.toString() !== ownerId) {
      throw new UserIsNotOwnerException();
    }
    const user = await this.userModel.find({
      _id: { $in: membersDto.memberIds },
    });
    if (user.length === 0 || user.length !== membersDto.memberIds.length) {
      throw new UserNotFoundException();
    }
    if (
      task.members.some((m) => membersDto.memberIds.includes(m.toString())) ===
      true
    ) {
      throw new UserAlreadyAssignedException();
    }
    task.members.push(...user.map((u) => u._id));
    return task.save();
  }

  async removeMembers(
    membersDto: MembersDto,
    ownerId: string,
    taskId: string,
  ): Promise<Task> {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }
    if (task.owner.toString() !== ownerId) {
      throw new UserIsNotOwnerException();
    }
    const user = await this.userModel.find({
      _id: { $in: membersDto.memberIds },
    });
    if (user.length === 0 || user.length !== membersDto.memberIds.length) {
      throw new UserNotFoundException();
    }
    if (
      task.members.some((m) => membersDto.memberIds.includes(m.toString())) ===
      false
    ) {
      throw new UserNotAssignedException();
    }
    task.members = task.members.filter(
      (m) => !membersDto.memberIds.includes(m.toString()),
    );
    return task.save();
  }
}
