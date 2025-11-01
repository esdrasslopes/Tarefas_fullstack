import type { Either } from "@/core/either";
import type { Project } from "@/domain/entities/project";

interface CreateProjectUseCaseRequest {}

type CreateProjectUseCaseResponse = Either<null, { project: Project }>;

export class CreateProjectUseCase {
  async execute({}: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {}
}
