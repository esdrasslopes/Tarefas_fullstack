import { left, right, type Either } from "@/core/either";
import type { ProjectsRepository } from "../repositories/projects-repository";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { Task } from "@/domain/entities/task";
import type { TasksRepository } from "../repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateTaskUseCaseRequest {
  projectId: string;
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  priority: "LOW" | "HIGH";
  requesterId: string;
}

type CreateTaskUseCaseResponse = Either<
  UnauthorizedError | UnauthorizedError,
  { task: Task }
>;

export class CreateTaskUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private usersRepository: UsersRepository,
    private tasksRepository: TasksRepository
  ) {}

  async execute({
    description,
    priority,
    projectId,
    status,
    title,
    requesterId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const permission = this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const project = await this.projectsRepository.findById(projectId);

    if (!project) {
      return left(new ResourceNotFoundError());
    }

    const task = await this.tasksRepository.create({
      description,
      priority,
      projectId,
      status,
      title,
    });

    return right({
      task,
    });
  }
}
