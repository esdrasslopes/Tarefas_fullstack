import { Project, type ProjectProps } from "@/domain/entities/project";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export function makeProject(override: Partial<ProjectProps> = {}) {
  const project = Project.create({
    description: faker.lorem.text(),
    projectName: faker.person.fullName(),
    enterpriseId: randomUUID(),
    id: randomUUID(),
    ...override,
  });

  return project;
}
