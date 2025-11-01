import type { Optional } from "@/core/types/optional";
import type { ProjectsRepository } from "@/domain/application/repositories/projects-repository";
import { Project, type ProjectProps } from "@/domain/entities/project";
import { randomUUID } from "crypto";

export class InMemoryProjectsRepository implements ProjectsRepository {
  public items: Project[] = [];

  async create(projectProps: Optional<ProjectProps, "id">) {
    const project = Project.create({
      ...projectProps,
      id: randomUUID(),
    });

    this.items.push(project);

    return project;
  }

  async findByProjectName(name: string) {
    const project = this.items.find((item) => item.projectName === name);

    if (!project) {
      return null;
    }

    return project;
  }

  async findById(id: string): Promise<Project | null> {
    const project = this.items.find((item) => item.id === id);

    if (!project) {
      return null;
    }

    return project;
  }
}
