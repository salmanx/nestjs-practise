import { TaskStatus } from './../tasks.model';
import { IsOptional, IsIn } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.IN_PROGRESS])
  status: string;

  @IsOptional()
  search: string;
}
