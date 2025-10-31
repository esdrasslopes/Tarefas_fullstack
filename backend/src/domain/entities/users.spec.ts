import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Users } from "./users";
import { UserGroup } from "./user-group";
import { randomUUID } from "crypto";

it("should be able to create an user group", () => {
  const userGroup = UserGroup.create(
    {
      groupName: "ADMIN",
      userAccess: "admin@localhost",
    },
    new UniqueEntityID(randomUUID())
  );

  const user = Users.create(
    {
      userGroupId: userGroup.id,
      userAccess: "admin@localhost",
    },
    new UniqueEntityID(randomUUID())
  );

  expect(user.userGroupId).toEqual(userGroup.id);
  expect(user.id.toString()).toEqual(expect.any(String));
  expect(user.userAccess).toEqual("admin@localhost");
});
