interface UserAccess {
  userGroupId: string;
  userAccessId: string;
}

export interface GroupsRepository {
  getUserAcess(role: "ADMIN" | "USER"): Promise<UserAccess | null>;
}
