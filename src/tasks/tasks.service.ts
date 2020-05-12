import { TaskRepository } from './task.repository';
import { GetTaskFilterDto } from './dto/getTaskFilterDto';
import { CreateTaskDto } from './dto/createTaskDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';

import { TaskStatus } from './tasks.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // private tasks: Task[] = [];

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto, user);
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksByFilter(filterDto: GetTaskFilterDto) {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!task) {
      throw new NotFoundException(`The Task with id "${id}" not found`);
    }

    return task;
  }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find(task => task.id === id);

  //   if (!task) {
  //     throw new NotFoundException(`The Task with id "${id}" not found`);
  //   }

  //   return task;
  // }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuidv1(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();

    return task;
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  async deleteTaskById(id: number, user: User): Promise<void> {
    // const result = await this.taskRepository.delete({
    //   id: id,
    //   userId: user.id,
    // });
    const task = await this.getTaskById(id, user);
    const result = await this.taskRepository.delete(task.id);

    if (result.affected === 0) {
      throw new NotFoundException(`The Task with id "${id}" not found`);
    }
  }

  // deleteTaskById(id: string): void {
  //   const task = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(t => t.id !== task.id);
  // }
}
