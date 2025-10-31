import type { UsersRepository } from "@/domain/application/repositories/users-repository";
import type { Users } from "@/domain/entities/users";

export class InMemoryUsersRepository implements UsersRepository {
  public items: Users[] = [];

  async fetchUsersAccess(): Promise<Users[]> {
    return this.items;
  }
}
