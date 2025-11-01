import { makeEnterprise } from "../../../../test/factories/make-enterprise";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { makeProject } from "../../../../test/factories/make-project";
import { InMemoryUserProjectsRepository } from "../../../../test/repositories/in-memory-user-projects-repository";
import { GetInAProjectUseCase } from "./get-in-a-project";
import { InMemoryEnterpriseRepository } from "../../../../test/repositories/in-memory-enterprise-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let inMemoryProjectsRepository: InMemoryProjectsRepository;
let inMemoryEnterpriseRepository: InMemoryEnterpriseRepository;
let inMemoryUserProjectsRepository: InMemoryUserProjectsRepository;
let sut: GetInAProjectUseCase;

describe("Create user project", () => {
  beforeEach(() => {
    inMemoryProjectsRepository = new InMemoryProjectsRepository();
    inMemoryUserProjectsRepository = new InMemoryUserProjectsRepository();
    inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    sut = new GetInAProjectUseCase(
      inMemoryProjectsRepository,
      inMemoryUserProjectsRepository
    );
  });

  it("should be able to create a new user project", async () => {
    const enterprise = makeEnterprise();

    inMemoryEnterpriseRepository.items.push(enterprise);

    const project = makeProject({
      enterpriseId: enterprise.id,
    });

    inMemoryProjectsRepository.items.push(project);

    const result = await sut.execute({
      projectId: project.id,
      userId: "123",
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      userProject: inMemoryUserProjectsRepository.items[0],
    });
  });

  it("should not be able to create user project", async () => {
    const result = await sut.execute({
      projectId: "id",
      userId: "123",
    });

    expect(result.isLeft());
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
