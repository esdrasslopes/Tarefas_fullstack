import { Users } from "@/domain/entities/users";
import { FakeHasher } from "../../../../test/cryptography/fake-hasher";
import { makeEnterprise } from "../../../../test/factories/make-enterprise";
import { InMemoryEnterpriseRepository } from "../../../../test/repositories/in-memory-enterprise-repository";
import { InMemoryGroupsRepository } from "../../../../test/repositories/in-memory-groups-repository";
import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-epository";
import { CreateUserUseCase } from "./create-user";
import { UserGroup } from "@/domain/entities/user-group";

let inMemoryEnterpriseRepository: InMemoryEnterpriseRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryGroupsRepository: InMemoryGroupsRepository;
let fakeHasher: FakeHasher;
let sut: CreateUserUseCase;

describe("Create user", async () => {
  beforeEach(() => {
    inMemoryEnterpriseRepository = new InMemoryEnterpriseRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository(
      inMemoryEnterpriseRepository
    );
    inMemoryGroupsRepository = new InMemoryGroupsRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateUserUseCase(
      inMemoryEnterpriseRepository,
      inMemoryUsersRepository,
      inMemoryGroupsRepository,
      fakeHasher
    );
  });

  it("should be able to create an user", async () => {
    const entreprise = makeEnterprise();

    inMemoryEnterpriseRepository.items.push(entreprise);

    const userAccess = Users.create({
      role: "ADMIN",
      userAccess: "admin@localhost",
    });

    inMemoryGroupsRepository.UserAccess.push(userAccess);

    inMemoryGroupsRepository.groups.push(
      UserGroup.create({
        groupName: "ADMIN",
        userAccessId: userAccess.id,
      })
    );

    const result = await sut.execute({
      email: "johndoe@example.com",
      enterpriseID: entreprise.id.toString(),
      name: "John Doe",
      password: "123456",
      requesterId: entreprise.id.toString(),
      userRole: "ADMIN",
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    });
  });
});
