import { Enterprise, type EnterpriseProps } from "@/domain/entities/enterprise";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export function makeEnterprise(override: Partial<EnterpriseProps> = {}) {
  const enterprise = Enterprise.create({
    cnpj: faker.lorem.text(),
    email: faker.internet.email(),
    entrepiseName: faker.person.fullName(),
    password: faker.internet.password(),
    id: randomUUID(),
    ...override,
  });

  return enterprise;
}
