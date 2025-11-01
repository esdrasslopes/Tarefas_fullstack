import { InMemoryEnterpriseRepository } from "../../../../test/repositories/in-memory-enterprise-repository";
import { makeEnterprise } from "../../../../test/factories/make-enterprise";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { CreateProjectUseCase } from "./create-project";
import { makeProject } from "../../../../test/factories/make-project";
import { ProjectAlreadyExistsError } from "../errors/project-already-exists.error";
import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-epository";
import { Users } from "@/domain/entities/users";
import { randomUUID } from "crypto";
import { InMemoryGroupsRepository } from "../../../../test/repositories/in-memory-groups-repository";
import { UserGroup } from "@/domain/entities/user-group";
import { makeUser } from "../../../../test/factories/make-user";

let inMemoryEnterpriseRepository: InMemoryEnterpriseRepository;
let inMemoryProjectsRepository: InMemoryProjectsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryGroupsRepository: InMemoryGroupsRepository;
let sut: CreateProjectUseCase;

describe("Create Project", () => {
  beforeEach(() => {
    inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    inMemoryGroupsRepository = new InMemoryGroupsRepository();
    inMemoryProjectsRepository = new InMemoryProjectsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository(
      inMemoryEnterpriseRepository
    );
    sut = new CreateProjectUseCase(
      inMemoryProjectsRepository,
      inMemoryEnterpriseRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to create a new project", async () => {
    const enterprise = makeEnterprise();

    if (!enterprise.id) {
      throw new Error();
    }

    inMemoryEnterpriseRepository.items.push(enterprise);

    const result = await sut.execute({
      description: "New project",
      enterpriseId: enterprise.id,
      projectName: "Project",
      requesterId: enterprise.id,
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      project: inMemoryProjectsRepository.items[0],
    });
  });

  it("should be able to create a new project with user admin", async () => {
    const enterprise = makeEnterprise();

    inMemoryEnterpriseRepository.items.push(enterprise);

    const userAccess = Users.create({
      role: "ADMIN",
      userAccess: "admin@localhost",
      id: randomUUID(),
    });

    inMemoryGroupsRepository.UserAccess.push(userAccess);

    inMemoryGroupsRepository.groups.push(
      UserGroup.create({
        groupName: "ADMIN",
        userAccessId: userAccess.id,
        id: randomUUID(),
      })
    );

    if (
      !inMemoryGroupsRepository.UserAccess[0]?.id ||
      !inMemoryGroupsRepository.groups[0]?.id
    ) {
      throw new Error();
    }

    const user = makeUser({
      email: "johndoe@example.com",
      enterpriseId: enterprise.id ?? "",
      name: "John Doe",
      password: "123456",
      role: "ADMIN",
      userAccessId: inMemoryGroupsRepository.UserAccess[0]?.id,
      userGroupId: inMemoryGroupsRepository.groups[0]?.id,
    });

    inMemoryUsersRepository.items.push(user);

    const result = await sut.execute({
      description: "New project",
      enterpriseId: enterprise.id,
      projectName: "Project",
      requesterId: user.id,
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      project: inMemoryProjectsRepository.items[0],
    });
  });

  it("should not be able to create a new project with same name", async () => {
    const enterprise = makeEnterprise();

    inMemoryEnterpriseRepository.items.push(enterprise);

    const project = makeProject({
      enterpriseId: enterprise.id,
      projectName: "Project",
    });

    inMemoryProjectsRepository.items.push(project);

    const result = await sut.execute({
      description: "New project",
      enterpriseId: enterprise.id,
      projectName: "Project",
      requesterId: enterprise.id,
    });

    expect(result.isLeft());
    expect(result.value).toBeInstanceOf(ProjectAlreadyExistsError);
  });
});
