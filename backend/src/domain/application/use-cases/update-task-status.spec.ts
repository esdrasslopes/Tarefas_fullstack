import { InMemoryEnterpriseRepository } from "@/test/repositories/in-memory-enterprise-repository";
import { makeEnterprise } from "@/test/factories/make-enterprise";
import { InMemoryProjectsRepository } from "@/test/repositories/in-memory-projects-repository";
import { makeProject } from "@/test/factories/make-project";
import { InMemoryTasksRepository } from "@/test/repositories/in-memory-tasks-repository";
import { UpdateTaskStatusUseCase } from "./update-task-status";
import { makeTask } from "@/test/factories/make-task";

let inMemoryEnterpriseRepository: InMemoryEnterpriseRepository;
let inMemoryProjectsRepository: InMemoryProjectsRepository;
let inMemoryTasksRepository: InMemoryTasksRepository;
let sut: UpdateTaskStatusUseCase;

describe("Update Task status", () => {
  beforeEach(() => {
    inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    inMemoryProjectsRepository = new InMemoryProjectsRepository();
    inMemoryTasksRepository = new InMemoryTasksRepository();
    sut = new UpdateTaskStatusUseCase(inMemoryTasksRepository);
  });

  it("should be able to create a new project", async () => {
    const enterprise = makeEnterprise();

    inMemoryEnterpriseRepository.items.push(enterprise);

    const project = makeProject({
      enterpriseId: enterprise.id,
    });

    inMemoryProjectsRepository.items.push(project);

    const task = makeTask({
      projectId: project.id,
    });

    inMemoryTasksRepository.items.push(task);

    const result = await sut.execute({
      status: "COMPLETED",
      taskId: task.id,
    });

    expect(result.isRight());
    expect(inMemoryTasksRepository.items[0]?.status).toEqual("COMPLETED");
  });
});
