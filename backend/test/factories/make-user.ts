import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User, type UserProps } from "@/domain/entities/user";
import { faker } from "@faker-js/faker";

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID
) {
  const user = User.create(
    {
      email: faker.internet.email(),
      entrepriseID: new UniqueEntityID(),
      name: faker.person.fullName(),
      role: "ADMIN",
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return user;
}
