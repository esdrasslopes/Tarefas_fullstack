import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Users } from "./users";
import { randomUUID } from "crypto";

it("should be able to create an user group", () => {
  const user = Users.create(
    {
      role: "ADMIN",
      userAccess: "admin@localhost",
    },
    new UniqueEntityID(randomUUID())
  );

  expect(user.id.toString()).toEqual(expect.any(String));
  expect(user.userAccess).toEqual("admin@localhost");
});
