import { Users } from "@/domain/entities/users";
import { FakeHasher } from "../../../../test/cryptography/fake-hasher";
import { makeEnterprise } from "../../../../test/factories/make-enterprise";
import { InMemoryEnterpriseRepository } from "../../../../test/repositories/in-memory-enterprise-repository";
import { InMemoryGroupsRepository } from "../../../../test/repositories/in-memory-groups-repository";
import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-epository";
import { CreateUserUseCase } from "./create-user";
import { UserGroup } from "@/domain/entities/user-group";
import { makeUser } from "../../../../test/factories/make-user";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { randomUUID } from "crypto";

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

    const result = await sut.execute({
      email: "johndoe@example.com",
      enterpriseID: entreprise.id,
      name: "John Doe",
      password: "123456",
      requesterId: entreprise.id,
      userRole: "ADMIN",
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    });
  });

  it("should be able to create an user being admin", async () => {
    const entreprise = makeEnterprise();

    inMemoryEnterpriseRepository.items.push(entreprise);

    const userAccess = Users.create({
      role: "ADMIN",
      userAccess: "admin@localhost",
      id: randomUUID(),
    });

    const userGroup = UserGroup.create({
      groupName: "ADMIN",
      userAccessId: userAccess.id,
      id: randomUUID(),
    });

    inMemoryGroupsRepository.UserAccess.push(userAccess);

    inMemoryGroupsRepository.groups.push(userGroup);

    const user = makeUser({
      entrepriseID: entreprise.id,
      userAccessID: userAccess.id,
      userGroupId: userGroup.id,
    });

    inMemoryUsersRepository.items.push(user);

    const result = await sut.execute({
      email: "johndoe@example.com",
      enterpriseID: entreprise.id,
      name: "John Doe",
      password: "123456",
      requesterId: user.id,
      userRole: "ADMIN",
    });

    expect(result.isRight());
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[1],
    });
  });

  it("should not be able to create an user", async () => {
    const entreprise = makeEnterprise();

    inMemoryEnterpriseRepository.items.push(entreprise);

    const userAccess = Users.create({
      role: "USER",
      userAccess: "admin@localhost",
      id: randomUUID(),
    });

    const userGroup = UserGroup.create({
      groupName: "USER",
      userAccessId: userAccess.id,
      id: randomUUID(),
    });

    inMemoryGroupsRepository.UserAccess.push(userAccess);

    inMemoryGroupsRepository.groups.push(userGroup);

    const user = makeUser({
      entrepriseID: entreprise.id,
      userAccessID: userAccess.id,
      userGroupId: userGroup.id,
      role: "USER",
    });

    inMemoryUsersRepository.items.push(user);

    const result = await sut.execute({
      email: "johndoe@example.com",
      enterpriseID: entreprise.id,
      name: "John Doe",
      password: "123456",
      requesterId: user.id,
      userRole: "USER",
    });

    expect(result.isLeft());
    expect(result.value).toBeInstanceOf(UnauthorizedError);
  });
});
