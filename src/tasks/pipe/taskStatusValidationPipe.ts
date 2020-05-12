import { TaskStatus } from './../tasks.model';
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedValue = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    // console.log(value);
    // console.log(metadata);
    value = value.toUpperCase();

    if (!this.isStattusValid(value)) {
      throw new BadRequestException(`${value} is not allowed`);
    }

    return value;
  }

  private isStattusValid(status: any) {
    const index = this.allowedValue.indexOf(status);

    return index !== -1;
  }
}
