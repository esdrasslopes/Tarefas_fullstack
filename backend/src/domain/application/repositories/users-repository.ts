import type { Users } from "@/domain/entities/users";

export interface UsersRepository {
  fetchUsersAccess(): Promise<Users[]>;
}
