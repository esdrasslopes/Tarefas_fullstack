import { left, right, type Either } from "@/core/either";
import { Enterprise } from "@/domain/entities/enterprise";
import type { EnterpriseRepository } from "../repositories/entreprises-repository";
import { EnterpriseAlreadyExistsError } from "../errors/enterprise-already-exists-error";
import type { HashGenerator } from "../cryptography/hash-generator";

interface CreateEnterpriseUseCaseRequest {
  cnpj: string;
  email: string;
  password: string;
  entrepiseName: string;
}

type CreateEnterpriseUseCaseResponse = Either<
  EnterpriseAlreadyExistsError,
  { enterprise: Enterprise }
>;

export class CreateEnterpriseUseCase {
  constructor(
    private enterpriseRepository: EnterpriseRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    cnpj,
    email,
    entrepiseName,
    password,
  }: CreateEnterpriseUseCaseRequest): Promise<CreateEnterpriseUseCaseResponse> {
    const enterpriseWithSameCnpj = await this.enterpriseRepository.findByCnpj(
      cnpj
    );

    if (enterpriseWithSameCnpj) {
      return left(new EnterpriseAlreadyExistsError(cnpj));
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const enterprise = Enterprise.create({
      cnpj,
      email,
      entrepiseName,
      password: passwordHash,
    });

    await this.enterpriseRepository.create(enterprise);

    return right({
      enterprise,
    });
  }
}
