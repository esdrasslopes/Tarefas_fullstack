import { FakeHasher } from "../../../../test/cryptography/fake-hasher";
import { InMemoryEnterpriseRepository } from "../../../../test/repositories/in-memory-enterprise-repository";
import { CreateEnterpriseUseCase } from "./create-enterprise";
import { EnterpriseAlreadyExistsError } from "../errors/enterprise-already-exists-error";
import { makeEnterprise } from "../../../../test/factories/make-enterprise";

let inMemoryEnterpriseRepository: InMemoryEnterpriseRepository;
let fakeHasher: FakeHasher;
let sut: CreateEnterpriseUseCase;

describe("Create enterprise", () => {
  beforeEach(() => {
    inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateEnterpriseUseCase(inMemoryEnterpriseRepository, fakeHasher);
  });

  it("should be able to create an enterprise", async () => {
    const result = await sut.execute({
      cnpj: "99.999.999/9999-9",
      email: "enterprise@gmail.com",
      entrepiseName: "Enterprise",
      password: "123456",
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      enterprise: inMemoryEnterpriseRepository.items[0],
    });
  });

  it("should not be able to create an enterprise with same cnpj", async () => {
    inMemoryEnterpriseRepository.items.push(
      makeEnterprise({
        cnpj: "99.999.999/9999-9",
      })
    );

    const result = await sut.execute({
      cnpj: "99.999.999/9999-9",
      email: "enterprise@gmail.com",
      entrepiseName: "Enterprise",
      password: "123456",
    });

    expect(result.isLeft());
    expect(result.value).toBeInstanceOf(EnterpriseAlreadyExistsError);
  });
});
