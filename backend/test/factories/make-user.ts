import { User, type UserProps } from "@/domain/entities/user";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export function makeUser(override: Partial<UserProps> = {}) {
  const user = User.create({
    email: faker.internet.email(),
    enterpriseId: randomUUID(),
    name: faker.person.fullName(),
    role: "ADMIN",
    password: faker.internet.password(),
    id: randomUUID(),
    userAccessId: randomUUID(),
    userGroupId: randomUUID(),
    ...override,
  });

  return user;
}
