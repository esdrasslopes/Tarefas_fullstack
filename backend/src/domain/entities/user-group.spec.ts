import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { UserGroup } from "./user-group";
import { randomUUID } from "crypto";

it("should be able to create an user group", () => {
  const userGroup = UserGroup.create(
    {
      groupName: "ADMIN",
      userAccessId: new UniqueEntityID(),
    },
    new UniqueEntityID(randomUUID())
  );

  expect(userGroup.groupName).toEqual("ADMIN");
  expect(userGroup.id.toString()).toEqual(expect.any(String));
});
