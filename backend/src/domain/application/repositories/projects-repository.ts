import { Project, type ProjectProps } from "@/domain/entities/project";

export interface ProjectsRepository {
  findByProjectName(name: string): Promise<Project | null>;
  findById(id: string): Promise<Project | null>;
  create(project: ProjectProps): Promise<Project>;
}
