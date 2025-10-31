import { left, right, type Either } from "@/core/either";
import type { EnterpriseRepository } from "../repositories/entreprises-repository";
import type { HashGenerator } from "../cryptography/hash-generator";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { User } from "@/domain/entities/user";
import { EnterpriseDoesNotExistsError } from "../errors/enterprise-does-not-exists-error";
import type { GroupsRepository } from "../repositories/groups-repository";

interface CreateUserUseCaseRequest {
  requesterId: string;
  enterpriseID: string;
  email: string;
  password: string;
  name: string;
  userRole: "ADMIN" | "USER";
}

type CreateUserUseCaseResponse = Either<UserAlreadyExistsError, { user: User }>;

export class CreateUserUseCase {
  constructor(
    private enterpriseRepository: EnterpriseRepository,
    private usersRepository: UsersRepository,
    private groupsRepository: GroupsRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    email,
    enterpriseID,
    name,
    password,
    userRole,
    requesterId,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const permission = await this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const enterprise = await this.enterpriseRepository.findById(enterpriseID);

    if (!enterprise) {
      return left(new EnterpriseDoesNotExistsError());
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const userInformations = await this.groupsRepository.getUserAcess(userRole);

    if (!userInformations) {
      throw new Error();
    }

    const user = User.create({
      email,
      entrepriseID: enterprise?.id,
      name,
      password: passwordHash,
      role: userRole,
      userGroupId: userInformations.userGroupId,
      userAccessID: userInformations.userAccessId,
    });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
