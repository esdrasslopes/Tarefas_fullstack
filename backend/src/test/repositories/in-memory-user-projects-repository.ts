import type { UserProjectsRepository } from "@/domain/application/repositories/user-projects-repository";
import {
  UserProject,
  type UserProjectProps,
} from "@/domain/entities/user-project";
import { randomUUID } from "crypto";

export class InMemoryUserProjectsRepository implements UserProjectsRepository {
  public items: UserProject[] = [];

  async create(userProps: UserProjectProps) {
    const userProject = UserProject.create({
      ...userProps,
      id: randomUUID(),
    });

    this.items.push(userProject);

    return userProject;
  }
}
