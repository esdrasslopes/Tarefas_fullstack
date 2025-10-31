import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Enterprise, type EnterpriseProps } from "@/domain/entities/enterprise";
import { faker } from "@faker-js/faker";

export function makeEnterprise(
  override: Partial<EnterpriseProps> = {},
  id?: UniqueEntityID
) {
  const enterprise = Enterprise.create(
    {
      cnpj: faker.lorem.text(),
      email: faker.internet.email(),
      entrepiseName: faker.person.fullName(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return enterprise;
}
