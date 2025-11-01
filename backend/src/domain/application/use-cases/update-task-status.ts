import { left, right, type Either } from "@/core/either";
import type { Task } from "@/domain/entities/task";
import type { TasksRepository } from "../repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateTaskStatusUseCaseRequest {
  taskId: string;
  status: "PENDING" | "COMPLETED";
}

type UpdateTaskStatusUseCaseResponse = Either<
  ResourceNotFoundError,
  { updatedTask: Task }
>;

export class UpdateTaskStatusUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    status,
    taskId,
  }: UpdateTaskStatusUseCaseRequest): Promise<UpdateTaskStatusUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      return left(new ResourceNotFoundError());
    }

    const updatedTask = await this.tasksRepository.updateTaskStatus(
      taskId,
      status
    );

    return right({
      updatedTask,
    });
  }
}
