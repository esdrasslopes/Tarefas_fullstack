import type { Optional } from "@/core/types/optional";
import { Project, type ProjectProps } from "@/domain/entities/project";

export interface ProjectsRepository {
  findByProjectName(name: string): Promise<Project | null>;
  findById(id: string): Promise<Project | null>;
  create(project: Optional<ProjectProps, "id">): Promise<Project>;
}
