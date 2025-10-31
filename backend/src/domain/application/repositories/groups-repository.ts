import type { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface UserAccess {
  userGroupId: UniqueEntityID;
  userAccessId: UniqueEntityID;
}

export interface GroupsRepository {
  getUserAcess(role: "ADMIN" | "USER"): Promise<UserAccess | null>;
}
