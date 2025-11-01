import { Users } from "./users";
import { randomUUID } from "crypto";

it("should be able to create an user group", () => {
  const user = Users.create({
    role: "ADMIN",
    userAccess: "admin@localhost",
    id: randomUUID(),
  });

  expect(user.id).toEqual(expect.any(String));
  expect(user.userAccess).toEqual("admin@localhost");
});
