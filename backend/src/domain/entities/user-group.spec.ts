import { UserGroup } from "./user-group";
import { randomUUID } from "crypto";

it("should be able to create an user group", () => {
  const userGroup = UserGroup.create({
    id: randomUUID(),
    groupName: "ADMIN",
    userAccessId: randomUUID(),
  });

  expect(userGroup.groupName).toEqual("ADMIN");
  expect(userGroup.id).toEqual(expect.any(String));
});
