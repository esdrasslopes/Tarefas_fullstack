import type { GroupsRepository } from "@/domain/application/repositories/groups-repository";
import { UserGroup } from "@/domain/entities/user-group";
import { Users } from "@/domain/entities/users";

export class InMemoryGroupsRepository implements GroupsRepository {
  public UserAccess: Users[] = [];
  public groups: UserGroup[] = [];

  async getUserAcess(role: "ADMIN" | "USER") {
    const userAccess = this.UserAccess.find((item) => item.role === role);

    if (!userAccess) {
      return null;
    }

    const group = this.groups.find(
      (item) => item.userAccessId === userAccess?.id
    );

    if (!group) {
      return null;
    }

    return {
      userAccessId: userAccess.id,
      userGroupId: group.id,
    };
  }
}
