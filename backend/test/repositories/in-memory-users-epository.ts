import type { UsersRepository } from "@/domain/application/repositories/users-repository";
import type { User } from "@/domain/entities/user";
import type { InMemoryEnterpriseRepository } from "./in-memory-enterprise-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  constructor(private enterpriseRepository: InMemoryEnterpriseRepository) {}

  async create(user: User) {
    this.items.push(user);
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((user) => user.id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async hasPermission(id: string) {
    const enterprise = await this.enterpriseRepository.findById(id);

    const user = await this.findById(id);

    if (enterprise || user?.role === "ADMIN") {
      return true;
    }

    return false;
  }
}
