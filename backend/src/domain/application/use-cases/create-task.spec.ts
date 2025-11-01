import { InMemoryEnterpriseRepository } from "../../../../test/repositories/in-memory-enterprise-repository";
import { makeEnterprise } from "../../../../test/factories/make-enterprise";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { makeProject } from "../../../../test/factories/make-project";
import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-epository";
import { CreateTaskUseCase } from "./create-task";
import { InMemoryTasksRepository } from "../../../../test/repositories/in-memory-tasks-repository";
import { createUsersGroupsAndAccess } from "../../../../test/utils/create-users-groups-and-access";
import { makeUser } from "../../../../test/factories/make-user";

let inMemoryEnterpriseRepository: InMemoryEnterpriseRepository;
let inMemoryProjectsRepository: InMemoryProjectsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryTasksRepository: InMemoryTasksRepository;
let sut: CreateTaskUseCase;

describe("Create Task", () => {
  beforeEach(() => {
    inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    inMemoryProjectsRepository = new InMemoryProjectsRepository();
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository(
      inMemoryEnterpriseRepository
    );
    sut = new CreateTaskUseCase(
      inMemoryProjectsRepository,
      inMemoryUsersRepository,
      inMemoryTasksRepository
    );
  });

  it("should be able to create a new project", async () => {
    const enterprise = makeEnterprise();

    inMemoryEnterpriseRepository.items.push(enterprise);

    const project = makeProject({
      enterpriseId: enterprise.id,
    });

    inMemoryProjectsRepository.items.push(project);

    const result = await sut.execute({
      description: "New task",
      priority: "HIGH",
      projectId: project.id,
      requesterId: enterprise.id,
      status: "PENDING",
      title: "New task",
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      task: inMemoryTasksRepository.items[0],
    });
  });

  it("should be able to create a new project with admin access", async () => {
    const enterprise = makeEnterprise();

    inMemoryEnterpriseRepository.items.push(enterprise);

    const userInformation = createUsersGroupsAndAccess();

    const user = makeUser({
      userAccessId: userInformation.userAccessId,
      userGroupId: userInformation.UserGroupId,
      enterpriseId: enterprise.id,
      role: "ADMIN",
    });

    inMemoryUsersRepository.items.push(user);

    const project = makeProject({
      enterpriseId: enterprise.id,
    });

    inMemoryProjectsRepository.items.push(project);

    const result = await sut.execute({
      description: "New task",
      priority: "HIGH",
      projectId: project.id,
      requesterId: user.id,
      status: "PENDING",
      title: "New task",
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      task: inMemoryTasksRepository.items[0],
    });
  });
});
