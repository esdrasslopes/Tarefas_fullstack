import { left, right, type Either } from "@/core/either";
import { Project } from "@/domain/entities/project";
import type { ProjectsRepository } from "../repositories/projects-repository";
import { ProjectAlreadyExistsError } from "../errors/project-already-exists.error";
import type { EnterpriseRepository } from "../repositories/entreprises-repository";
import { EnterpriseDoesNotExistsError } from "../errors/enterprise-does-not-exists-error";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";

interface CreateProjectUseCaseRequest {
  projectName: string;
  description: string;
  enterpriseId: string;
  requesterId: string;
}

type CreateProjectUseCaseResponse = Either<
  ProjectAlreadyExistsError | EnterpriseDoesNotExistsError | UnauthorizedError,
  { project: Project }
>;

export class CreateProjectUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private enterpriseRepository: EnterpriseRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    projectName,
    description,
    enterpriseId,
    requesterId,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    const projectAlreadyExists =
      await this.projectsRepository.findByProjectName(projectName);

    if (projectAlreadyExists) {
      return left(new ProjectAlreadyExistsError());
    }

    const enterprise = await this.enterpriseRepository.findById(enterpriseId);

    if (!enterprise) {
      return left(new EnterpriseDoesNotExistsError());
    }

    const permission = await this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const project = await this.projectsRepository.create({
      description,
      enterpriseId,
      projectName,
    });

    return right({
      project,
    });
  }
}
