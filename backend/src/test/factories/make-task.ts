import { Task, type TaskProps } from "@/domain/entities/task";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export function makeTask(override: Partial<TaskProps> = {}) {
  const task = Task.create({
    description: faker.lorem.paragraph(),
    title: faker.lorem.text(),
    createdAt: new Date(),
    id: randomUUID(),
    priority: "HIGH",
    projectId: randomUUID(),
    status: "PENDING",
    ...override,
  });

  return task;
}
