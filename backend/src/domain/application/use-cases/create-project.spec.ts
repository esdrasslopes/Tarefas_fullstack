import { InMemoryEnterpriseRepository } from "../../../../test/repositories/in-memory-enterprise-repository";
import { makeEnterprise } from "../../../../test/factories/make-enterprise";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { CreateProjectUseCase } from "./create-project";
import { makeProject } from "../../../../test/factories/make-project";
import { ProjectAlreadyExistsError } from "../errors/project-already-exists.error";

let inMemoryEnterpriseRepository: InMemoryEnterpriseRepository;
let inMemoryProjectsRepository: InMemoryProjectsRepository;
let sut: CreateProjectUseCase;

describe("Create Project", () => {
  beforeEach(() => {
    inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    inMemoryProjectsRepository = new InMemoryProjectsRepository();
    sut = new CreateProjectUseCase(
      inMemoryProjectsRepository,
      inMemoryEnterpriseRepository
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
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      project: inMemoryProjectsRepository.items[0],
    });
  });

  it("should not be able to create a new project with same name", async () => {
    const enterprise = makeEnterprise();

    if (!enterprise.id) {
      throw new Error();
    }

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
    });

    expect(result.isLeft());
    expect(result.value).toBeInstanceOf(ProjectAlreadyExistsError);
  });
});
