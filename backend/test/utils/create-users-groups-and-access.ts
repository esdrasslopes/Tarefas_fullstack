import { Users } from "@/domain/entities/users";
import { InMemoryGroupsRepository } from "../repositories/in-memory-groups-repository";
import { randomUUID } from "crypto";
import { UserGroup } from "@/domain/entities/user-group";

export const createUsersGroupsAndAccess = () => {
  const inMemoryGroupsRepository = new InMemoryGroupsRepository();

  const userAccess = Users.create({
    id: randomUUID(),
    role: "ADMIN",
    userAccess: "admin@localhost",
  });

  inMemoryGroupsRepository.UserAccess.push(userAccess);

  const userGroup = UserGroup.create({
    groupName: "ADMIN",
    id: randomUUID(),
    userAccessId: userAccess.id,
  });

  inMemoryGroupsRepository.groups.push(userGroup);

  return {
    userAccessId: userAccess.id,
    UserGroupId: userGroup.id,
  };
};
