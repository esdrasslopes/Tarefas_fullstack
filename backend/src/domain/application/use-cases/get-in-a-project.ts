import { left, right, type Either } from "@/core/either";
import type { ProjectsRepository } from "../repositories/projects-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { UserProject } from "@/domain/entities/user-project";
import type { UserProjectsRepository } from "../repositories/user-projects-repository";

interface GetInAProjectUseCaseRequest {
  userId: string;
  projectId: string;
}

type GetInAProjectUseCaseResponse = Either<
  ResourceNotFoundError,
  { userProject: UserProject }
>;

export class GetInAProjectUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private userProjectsRepository: UserProjectsRepository
  ) {}

  async execute({
    projectId,
    userId,
  }: GetInAProjectUseCaseRequest): Promise<GetInAProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId);

    if (!project) {
      return left(new ResourceNotFoundError());
    }

    const userProject = await this.userProjectsRepository.create({
      projectId,
      userId,
    });

    return right({
      userProject,
    });
  }
}
